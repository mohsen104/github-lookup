import { IoLogoGithub } from "react-icons/io";

function Footer() {
  return (
    <footer className="w-full flex items-center justify-between text-sm px-4 py-3 border-t-1 border-t-gray-200">
      <p>Made with ❤️</p>
      <a href="https://github.com/mohsen104" target="_blank" rel="noopener noreferrer">
        <IoLogoGithub size={24} className="text-primary" />
      </a>
    </footer>
  );
}

export default Footer;
