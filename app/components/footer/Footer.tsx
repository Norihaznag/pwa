import {
  Facebook01Icon,
  TwitterIcon,
  InstagramIcon,
} from "hugeicons-react";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  const footer = [
    {
      id: 1,
      title: "Email",
      description: "nordin0aznag@gmail.com",
    },
    {
      id: 2,
      title: "Phone",
      description: "+212609343676",
    },
    {
      id: 3,
      title: "Address",
      description: "Rue Av hdhd .td",
    },
  ];

  const quickLinks = [
    { id: 1, name: "About Us", url: "/" },
    { id: 2, name: "Menu", url: "/" },
    { id: 3, name: "Contact", url: "/" },
    { id: 4, name: "Privacy Policy", url: "/" },
  ];

  const social = [
    {
      id: 1,
      title: "Facebook",
      icon: <Facebook01Icon />,
      url: "/",
    },
    {
      id: 2,
      title: "Twitter",
      icon: <TwitterIcon />,
      url: "/",
    },
    {
      id: 3,
      title: "Instagram",
      icon: <InstagramIcon />,
      url: "/",
    },
  ];

  return (
    <footer className=" p-10 text-black">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          {footer.map((info) => (
            <div key={info.id}>
              <h3 className="font-medium">{info.title}:</h3>
              <p className="text-gray-400">{info.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.url}
                  className="flex gap-2"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media and Newsletter */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">Follow Us</h2>
          <div className="flex space-x-4">
            {social.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="p-3  rounded-full hover:bg-gray-200 transition-all duration-200"
              >
                {item.icon}
              </Link>
            ))}
          </div>

         
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
