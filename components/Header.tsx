import Image from "next/image";
import { getSocialMedia } from "@/lib/config";
export default function Header() {
  return (
    <header className="flex justify-between text-center max-w-7xl mx-auto p-4">
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
        <h1 className="text-3xl font-bold">Photo Tailor</h1>
      </a>
      <div className="flex items-center space-x-4">
        {getSocialMedia(["buymeacoffee", "github"]).map((media) => (
          <a href={media.href} key={media.id} target="_blank">
            <media.svg className="w-6 h-6" />
          </a>
        ))}
        <a href="/about">About</a>
      </div>
    </header>
  );
}
