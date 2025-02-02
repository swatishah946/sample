import React from "react";
import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-900">
            EaseLogi
          </h1>
          <p className="mt-3 text-center text-gray-600 max-w-md mx-auto">
            Streamline your logistics operations with our comprehensive platform
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
