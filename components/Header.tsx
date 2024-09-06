import Image from "next/image";
import { motion } from "framer-motion";
export default function Header() {
  return (
    <header className="flex items-center justify-between h-[64px] px-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Image
            src="/rainbow.svg"
            width={64}
            height={64}
            alt="PhotoTailor"
            className="object-contain transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 animate-pulse">
            Photo Tailor
          </h1>
          <p className="text-sm md:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 animate-pulse">
            Upload, Beautify, and Personalize Your Picture!
          </p>
        </div>
      </div>

      <a
        href="https://www.buymeacoffee.com/sept.miamia"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center text-gray-700 hover:text-gray-900 font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-gray-100">
        <Image
          src="/bmc-logo.png"
          alt="Buy Me A Coffee"
          width={24}
          height={24}
          className="mr-2"
        />
        <span className="hidden sm:inline overflow-hidden">
          <span className="inline-block group-hover:animate-wave">
            Support Me
          </span>
          <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            ☕️
          </span>
        </span>
      </a>
    </header>
  );
}
