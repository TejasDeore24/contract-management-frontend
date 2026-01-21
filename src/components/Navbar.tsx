import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md font-medium transition ${
      isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">Contract Manager</div>
        <div className="flex space-x-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/blueprints" className={linkClass}>
            Blueprints
          </NavLink>
          <NavLink to="/contracts" className={linkClass}>
            Contracts
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
