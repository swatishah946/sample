import React, { useState } from "react";

const OperationsControl = () => {
  // State to manage users
  const [users, setUsers] = useState([
    { id: 1, name: "Amit Sharma", role: "MSME", status: "Active" },
    { id: 2, name: "Rajesh Kumar", role: "Logistics Provider", status: "Inactive" },
  ]);

  // State to manage new user input
  const [newUser, setNewUser] = useState({ name: "", role: "", status: "Active" });

  // Handle input change
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add a new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.role) {
      alert("Please enter both Name and Role.");
      return;
    }

    const newUserEntry = {
      id: users.length + 1,
      name: newUser.name,
      role: newUser.role,
      status: newUser.status,
    };

    setUsers([...users, newUserEntry]);
    setNewUser({ name: "", role: "", status: "Active" }); // Reset input fields
  };

  // Delete a user
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Operations Control</h2>

      {/* User Management Section */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
        <h3 className="text-md font-bold mb-2">User Management</h3>

        {/* Add User Form */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={newUser.name}
            onChange={handleInputChange}
            className="p-2 border rounded w-1/3"
          />
          <input
            type="text"
            name="role"
            placeholder="Enter Role"
            value={newUser.role}
            onChange={handleInputChange}
            className="p-2 border rounded w-1/3"
          />
          <select
            name="status"
            value={newUser.status}
            onChange={handleInputChange}
            className="p-2 border rounded w-1/4"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            onClick={handleAddUser}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add User
          </button>
        </div>

        {/* User List Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.role}</td>
                <td className={`p-2 font-bold ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                  {user.status}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="p-2 text-center text-gray-600">
                  No users available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Logistics Monitoring Section */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-md font-bold mb-2">Logistics Monitoring</h3>
        <p className="text-gray-600">Live tracking & shipment status coming soon...</p>
      </div>
    </div>
  );
};

export default OperationsControl;
