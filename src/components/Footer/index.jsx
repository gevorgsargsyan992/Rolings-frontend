const Footer = () => {
  return (
    <footer className="bg-gray-200 p-4 mt-auto w-full">
      <p className="text-center text-gray-800">
        &copy; {new Date().getFullYear()} Rollings
      </p>
    </footer>
  );
};

export default Footer;