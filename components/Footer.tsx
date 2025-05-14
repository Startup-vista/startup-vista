import Link from "next/link"
import { Separator } from "./ui/separator"

export const Footer = () => {
  const companyLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ]

  const legalLinks = [
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Community Guidelines", href: "/community-guidelines" },
    { name: "Content Guidelines", href: "/content-guidelines" },
  ]

  const resourceLinks = [
    { name: "Blogs", href: "/blogs" },
  ]

  const socialLinks = [
    { name: "Twitter", href: "https://x.com/StartupVista_in?t=Xft-AIqK15_LbKcAfXv7FA&s=08", icon: "/icons/x.svg" },
    { name: "Youtube", href: "https://youtube.com/@startupvista?si=Wx_GXIuo3fhjd6sG", icon: "/icons/meta.svg" },
    { name: "Instagram", href: "https://instagram.com/startupvista.in", icon: "/icons/instagram.svg" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/startupvista/", icon: "/icons/linkedin.svg" },
  ]

  return (
    <footer className="bg-primary-200 text-text-800 border-t-1 border-[#666666]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-900">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-900">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-900">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:underline transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* Social Links */}
              <h3 className="text-lg font-semibold mb-4 text-text-900">Follow Us On</h3>
              <div className="flex flex-col space-y-3">
                {socialLinks.map((social) => (
                  <Link 
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline transition-opacity"
                  >
                    {social.name}
                  </Link>
                ))}
              </div>
            </div>
        </div>

        <Separator className="my-8 bg-secondary-200" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
              <span className="ml-2 text-sm text-secondary-600">
                © {new Date().getFullYear()} StartupVista. All rights reserved.
              </span>
          </div>

          <div className="flex space-x-6">
            <Link href="/cookie-policy" className="text-sm hover:underline">
              Cookie Policy
            </Link>
            <Link href="/sitemap" className="text-sm hover:underline">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}