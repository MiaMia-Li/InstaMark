import Image from "next/image";
import { getSocialMedia } from "@/lib/config";
export default function Header() {
  return (
    <nav className="flex justify-between text-center py-4 px-4 text-black md:px-10">
      <a href="/" className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Image
            src="/rainbow.svg"
            width={50}
            height={50}
            alt="PhotoTailor"
            className="object-contain"
          />
        </div>
        <div className="text-3xl font-bold">Photo Tailor</div>
      </a>
      <div className="flex items-center space-x-4">
        {getSocialMedia(["buymeacoffee", "github"]).map((media) => (
          <a
            href={media.href}
            key={media.id}
            target="_blank"
            aria-label={media.description}>
            <media.svg className="w-6 h-6" />
          </a>
        ))}
        <a href="/about">About</a>
      </div>
    </nav>
  );
}
