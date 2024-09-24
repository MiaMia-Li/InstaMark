export default function Footer() {
  return (
    <div className="flex justify-center py-2 transition-colors duration-300 ease-in-out">
      <p className="text-sm text-gray-700">
        © {new Date().getFullYear()} All rights reserved. created by ❤️{" "}
        <a
          target="_blank"
          href="https://www.linkedin.com/in/mengyao-li-software/">
          Mia
        </a>
      </p>
    </div>
  );
}
