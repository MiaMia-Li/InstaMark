import { SOCIAL_MEDIA } from "@/lib/config";

export default function Footer() {
  return (
    <div className="flex justify-center">
      <ul className="flex gap-x-6">
        {SOCIAL_MEDIA.map((item, index) => {
          const Com = item.svg;
          return (
            <li key={`${item}-${index}`}>
              <a
                href={item.href}
                className="block p-2 rounded-full transition-colors duration-300 ease-in-out"
                target="_blank"
                rel="noopener noreferrer">
                <Com className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 hover:text-blue-600 transition-colors duration-300 ease-in-out" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
