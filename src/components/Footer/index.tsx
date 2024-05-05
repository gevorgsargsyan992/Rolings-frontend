import Image from "next/image";
import logo from "../../../public/rolings-logo.svg";

const Footer = () => {
  return (
    <>
      <div className="max-w-5xl w-full py-8 bg-blue-grayish">
        <Image
          className="lg:mr-6"
          objectFit="contain"
          width={100}
          src={logo}
          alt="logo image"
        />
      </div>

      <footer className="w-full bg-white p-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="col-span-1 md:col-span-4 grid grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <h5 className="font-bold">Company</h5>
              <ul>
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <a href="/careers">Careers</a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold">Resources</h5>
              <ul>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a href="/news">News</a>
                </li>
                <li>
                  <a href="/support">Support</a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold">Legal</h5>
              <ul>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms of Use</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-1 md:col-span-1 flex flex-col justify-between">
            <div>
              <h5 className="font-bold mb-2">Join Our Newsletter</h5>
              <form className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
