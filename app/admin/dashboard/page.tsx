"use client";

import { useState, useEffect } from "react";
import { collection, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {MoreHorizontal, Check, X, RefreshCw, Users, Shield, Cross} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
    id: string;
    email: string;
    fullName?: string;
    brandName?: string;
    isVerified: boolean;
    createdAt: any;
}

interface AdminUser  {
    id: string;
    isVerified: boolean;
    email: string;
    isAdmin: boolean;
    isEditor: boolean;
}

export default function AdminDashboard() {
    const [regularUsers, setRegularUsers] = useState<User[]>([]);
    const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [verifyingUser, setVerifyingUser] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);

            // Fetch regular users
            const usersQuery = query(collection(db, "users"));
            const usersSnapshot = await getDocs(usersQuery);
            const usersData = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as User));

            // Fetch admin users
            const adminsQuery = query(collection(db, "admins"));
            const adminsSnapshot = await getDocs(adminsQuery);
            const adminsData = adminsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as AdminUser));

            setRegularUsers(usersData);
            setAdminUsers(adminsData);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to load users. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const refreshData = async () => {
        setRefreshing(true);
        await fetchUsers();
        setRefreshing(false);
        toast.success("User data has been refreshed");
    };

    const sendVerificationEmail = async (email: string, status: string, brandName?: string) => {
        try {
            const response = await fetch('/api/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    status,
                    brandName: brandName
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send verification email');
            }

            return await response.json();
        } catch (error) {
            console.error("Error sending verification email:", error);
            throw error;
        }
    };

    const handleVerifyUser = async (userId: string) => {
        try {
            setVerifyingUser(userId);
            // Find the user
            const user = regularUsers.find(u => u.id === userId);
            if (!user) {
                throw new Error("User not found");
            }

            // Update in Firestore
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, { isVerified: true });

            // Send verification email
            await sendVerificationEmail(user.email, "verified", user.brandName);

            // Update state
            setRegularUsers(regularUsers.map(u =>
                u.id === userId ? { ...u, isVerified: true } : u
            ));

            toast.success("User verified successfully and notification email sent");
        } catch (error) {
            console.error("Error verifying user:", error);
            toast.error("Failed to verify user or send email");
        } finally {
            setVerifyingUser(null);
        }
    };

    const handleRejectUser = async (userId: string) => {
        try {
            // Find the user
            const user = regularUsers.find(u => u.id === userId);
            if (!user) {
                throw new Error("User not found");
            }

            // Send rejection email
            await sendVerificationEmail(user.email, "rejected", user.brandName);

            toast.success("Rejection notification email sent");
        } catch (error) {
            console.error("Error rejecting user:", error);
            toast.error("Failed to send rejection email");
        }
    };

    const handleVerifyAdmin = async (userId: string) => {
        try {
            const adminRef = doc(db, "users", userId);
            await updateDoc(adminRef, { isVerified: true });

            setAdminUsers(adminUsers.map(admin =>
                admin.id === userId ? { ...admin, isVerified: true } : admin
            ));

            toast.success("Admin verified successfully");
        } catch (error) {
            console.error("Error verifying admin:", error);
            toast.error("Failed to verify admin");
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp?.toDate) return "N/A";
        return timestamp.toDate().toLocaleDateString();
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">
                        Manage users and admin accounts
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={refreshData}
                    disabled={refreshing}
                >
                    <RefreshCw className={`h-4 w-4 mr-2 ${refreshing && "animate-spin"}`} />
                    Refresh
                </Button>
            </div>

            <Tabs defaultValue="users">
                <TabsList className="grid w-full grid-cols-2 max-w-xs mb-6">
                    <TabsTrigger value="users">
                        <Users className="h-4 w-4 mr-2" />
                        Users
                    </TabsTrigger>
                    <TabsTrigger value="admins">
                        <Shield className="h-4 w-4 mr-2" />
                        Admins
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="users">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Management</CardTitle>
                            <CardDescription>
                                Verify or reject regular user accounts
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Company</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Joined</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {regularUsers.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="h-24 text-center">
                                                    No users found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            regularUsers.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>{user.brandName || "-"}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={user.isVerified ? "default" : "secondary"}>
                                                            {user.isVerified ? "Verified" : "Pending"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                                                    <TableCell>
                                                        {!user.isVerified ? (
                                                            <div className="flex space-x-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => handleVerifyUser(user.id)}
                                                                    disabled={verifyingUser === user.id}
                                                                >
                                                                    {verifyingUser === user.id ? (
                                                                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                                                    ) : (
                                                                        <Check className="h-4 w-4 mr-2" />
                                                                    )}
                                                                    Verify
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => handleRejectUser(user.id)}
                                                                >
                                                                    <X className="h-4 w-4 mr-2" />
                                                                    Reject
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <Badge variant="outline" className="bg-green-50">Verified</Badge>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="admins">
                    <Card>
                        <CardHeader>
                            <CardTitle>Admin Management</CardTitle>
                            <CardDescription>
                                Manage admin accounts and permissions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Joined</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {adminUsers.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="h-24 text-center">
                                                    No admin users found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            adminUsers.map((admin) => (
                                                <TableRow key={admin.id}>
                                                    <TableCell>{admin.email}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={admin.isVerified ? "default" : "secondary"}>
                                                            {admin.isVerified ? "Verified" : "Pending"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant={admin.isAdmin ? "destructive" : "outline"}>
                                                            {admin.isAdmin ? "Super Admin" : "Editor"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                {!admin.isVerified && (
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleVerifyAdmin(admin.id)}
                                                                    >
                                                                        <Check className="mr-2 h-4 w-4" />
                                                                        Verify Admin
                                                                    </DropdownMenuItem>
                                                                )}
                                                                <DropdownMenuItem>
                                                                    <X className="mr-2 h-4 w-4" />
                                                                    Revoke Access
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}