"use client";
import { FaGithub, FaXTwitter, FaDiscord, FaLinkedin } from "react-icons/fa6";
import Image from "next/image";
import Favicon from "../../favicon.ico";
import { motion } from "framer-motion";


export default function Footer() {
  return (
    <footer className="text-sm text-gray-400 py-12 px-6 mt-24 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-8">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <Image
            src={Favicon}
            alt="CarbonX Logo"
            width={24}
            height={24}
            className="invert"
          />
          <span className="text-white font-semibold text-lg">CarbonX</span>
        </div>

        {/* Tagline */}
        <p className="text-center text-gray-500 max-w-md">
          Empowering environmental impact through blockchain technology. Trade carbon offsets as NFTs.
        </p>

        {/* Social Icons */}
        <div className="flex items-center space-x-6">
          <motion.a
            href="https://github.com/0xEgao/CarbonX"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <FaGithub size={20} />
          </motion.a>

          <motion.div
            className="relative group cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
          >
            <FaXTwitter className="text-gray-400" size={20} />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Coming Soon
            </div>
          </motion.div>

          <motion.div
            className="relative group cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
          >
            <FaDiscord className="text-gray-400" size={20} />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Coming Soon
            </div>
          </motion.div>

          <motion.div
            className="relative group cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
          >
            <FaLinkedin className="text-gray-400" size={20} />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Coming Soon
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-xs">
          © {new Date().getFullYear()} CarbonX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
