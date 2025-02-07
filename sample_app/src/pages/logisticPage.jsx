import { Link, Outlet } from "react-router-dom";

const DashPage = () => {
  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">EaseLogi</h1>
          <div className="flex space-x-4">
            <Link to="/logidashboard/logistic" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Home
            </Link>
            <Link to="/logidashboard/logiprofile" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Profile
            </Link>
            <Link to="/logidashboard/logihelp" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
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

export default DashPage;