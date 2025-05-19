import { auth, db, storage } from "@/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    UserCredential,
    signOut
} from "firebase/auth";
import {
    doc,
    setDoc,
    getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FirebaseError } from "firebase/app";

interface SignUpParams {
    email: string;
    password: string;
    userData: Record<string, any>;
    files?: {
        companyLogo?: File;
        incorporationCertificate?: File;
    };
}

interface UserDocument {
    uid: string;
    email: string;
    isVerified: boolean;
    isPremium: boolean;
    createdAt: Date;
    [key: string]: any;
}

export const authService = {
    async signUp({ email, password, userData, files }: SignUpParams): Promise<void> {
        try {
            // 1. Create user in Firebase Authentication
            const userCredential: UserCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // 2. Upload files if they exist
            const fileUrls: Record<string, string | null> = {};

            if (files) {
                const uploadPromises = [];

                if (files.companyLogo) {
                    uploadPromises.push(
                        this.uploadFile(`users/${userCredential.user.uid}/companyLogo`, files.companyLogo)
                            .then(url => { fileUrls.companyLogo = url; })
                    );
                }

                if (files.incorporationCertificate) {
                    uploadPromises.push(
                        this.uploadFile(`users/${userCredential.user.uid}/incorporationCertificate`, files.incorporationCertificate)
                            .then(url => { fileUrls.incorporationCertificate = url; })
                    );
                }

                await Promise.all(uploadPromises);
            }

            const cleanUserData = Object.fromEntries(
                Object.entries(userData).filter(([_, value]) => value !== undefined)
            );

            // 4. Create user document in Firestore
            const userDoc: UserDocument = {
                uid: userCredential.user.uid,
                email,
                isVerified: false,
                isPremium: false,
                createdAt: new Date(),
                ...cleanUserData,
                ...fileUrls
            };

            await setDoc(doc(db, "users", userCredential.user.uid), userDoc);
            await signOut(auth);

        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error("Firebase error:", error.code, error.message);
                throw new Error(this.getFirebaseErrorMessage(error.code));
            }
            throw error;
        }
    },

    async uploadFile(path: string, file: File): Promise<string> {
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    },

    async checkUserVerification(uid: string): Promise<boolean> {
        const userDoc = await getDoc(doc(db, "users", uid));
        return userDoc.exists() ? userDoc.data().isVerified : false;
    },

    async signIn(email: string, password: string): Promise<{ user: UserCredential; isVerified: boolean }> {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const isVerified = await this.checkUserVerification(userCredential.user.uid);
        return { user: userCredential, isVerified };
    },

    async signOut(): Promise<void> {
        await signOut(auth);
    },

    getFirebaseErrorMessage(code: string): string {
        switch (code) {
            case "auth/email-already-in-use":
                return "Email already in use";
            case "auth/invalid-email":
                return "Invalid email address";
            case "auth/weak-password":
                return "Password should be at least 6 characters";
            case "auth/user-not-found":
                return "User not found";
            case "auth/wrong-password":
                return "Incorrect password";
            default:
                return "An error occurred. Please try again.";
        }
    },

};


export async function createAdminUser({
                                          email,
                                          password,
                                          fullName,
                                      }: {
    email: string;
    password: string;
    fullName: string;
}) {
    const user: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "admins", user.user.uid), {
        email,
        fullName,
        isAdmin: false,
        isEditor: false,
        isVerified: false,
        createdAt: new Date(),
    });

    return user;
}

export async function checkAdminVerificationStatus(uid: string) {
    const docRef = doc(db, "admins", uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new Error("User record not found");
    }

    const userData = docSnap.data();
    if (!userData.isVerified) {
        throw new Error("Not an admin user");
    }

    return userData.isVerified;
}