import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 text-white py-4 px-6 w-full">
    <div className="flex justify-between max-w-4xl mx-auto">
      <h1 className="text-xl font-bold">City Weather</h1>
      <div>
        <Link to="/" className="mx-2 hover:underline">
          Home
        </Link>
        <Link to="/page2" className="mx-2 hover:underline">
          Page-2
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
