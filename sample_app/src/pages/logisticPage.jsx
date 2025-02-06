import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.jpg";
const logisticPage = () => {
  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <header className="bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg px-6 py-4 flex justify-between items-center">
        
                  {/* Logo & Brand */}
                  <div className="flex items-center space-x-3">
                    <img src={logo} alt="EaseLogi Logo" className="h-12 w-auto rounded-lg shadow-md" />
                    <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">EaseLogi</h1>
                  </div>
        
          <div className="flex space-x-4">
            <Link to="/logidashboard/logistic" className="px-5 py-2 bg-white text-pink-500 font-semibold rounded-lg shadow-md hover:bg-blue-200 transition">
              Home
            </Link>
            <Link to="/logidashboard/logiprofile" className="px-5 py-2 bg-white text-pink-500 font-semibold rounded-lg shadow-md hover:bg-blue-200 transition">
              Profile
            </Link>
            <Link to="/logidashboard/logihelp" className="px-5 py-2 bg-white text-pink-500 font-semibold rounded-lg shadow-md hover:bg-blue-200 transition">
              Help
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default logisticPage;