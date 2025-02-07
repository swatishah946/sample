import React, { useState } from "react";
import { FaTruck, FaCheckCircle, FaClock } from "react-icons/fa";
import Card from "../ui/Card";
import CardContent from "../ui/CardContent";
import Button from "../ui/Button";

const MSMEDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [loadMatches, setLoadMatches] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newShipment = {
      id: `SH00${shipments.length + 1}`,
      from: formData.get("originCity"),
      to: formData.get("destinationCity"),
      status: "Pending",
      icon: <FaClock className="text-yellow-500" />,
    };
    setShipments([newShipment, ...shipments]);
    setLoadMatches([{ matchScore: Math.floor(Math.random() * 100), savings: Math.floor(Math.random() * 1000) }, ...loadMatches]);
    setShowForm(false);
    e.target.reset();
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">🚚 Active Shipments</h2>
        <div className="max-h-96 overflow-y-auto space-y-4">
          {shipments.length === 0 ? (
            <p className="text-gray-500 text-lg">No shipments available. Start by adding a new shipment.</p>
          ) : (
            shipments.map((shipment) => (
              <Card key={shipment.id} className="shadow-lg rounded-xl border border-gray-200 p-4 bg-white">
                <CardContent className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-lg text-gray-900">{shipment.id}</div>
                    <div className="text-gray-600">{shipment.from} → {shipment.to}</div>
                    <div className="flex items-center space-x-2 text-gray-700 mt-1">
                      {shipment.icon} <span className="text-sm">{shipment.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">📦 Load Matching</h2>
        <div className="max-h-96 overflow-y-auto space-y-4">
          {loadMatches.length === 0 ? (
            <p className="text-gray-500 text-lg">No load matches found.</p>
          ) : (
            loadMatches.map((match, index) => (
              <Card key={index} className="shadow-md rounded-xl border border-gray-200 p-4 bg-white">
                <CardContent>
                  <div className="mb-2 text-lg font-semibold text-gray-800">Match Score: {match.matchScore}%</div>
                  <div className="w-full bg-gray-300 rounded-full h-3 mb-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: `${match.matchScore}%` }}></div>
                  </div>
                  <div className="text-green-600 font-semibold">💰 Savings: ₹{match.savings.toLocaleString()}</div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* New Shipment Order */}
      <div className="col-span-1 md:col-span-2">
        <Button className="mb-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "+ New Shipment Order"}
        </Button>

        {showForm && (
          <Card className="p-6 shadow-lg rounded-lg">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">📜 Create a New Shipment</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
        
              <h4 className="col-span-2 font-semibold mt-4">Origin Information</h4>
              <input type="text" className="p-2 border rounded" placeholder="Origin Company Name*" required />
              <input type="text" className="p-2 border rounded" placeholder="Desired Pickup Time*" required />
              <input type="text" className="p-2 border rounded" placeholder="Pick-up Address*" required />
              <input name="originCity" type="text" className="p-2 border rounded" placeholder="Origin City*" required />
              <input type="text" className="p-2 border rounded" placeholder="Zip Code*" required />
        
              <h4 className="col-span-2 font-semibold mt-4">Destination Information</h4>
              <input type="text" className="p-2 border rounded" placeholder="Destination Company Name*" required />
              <input type="text" className="p-2 border rounded" placeholder="Desired Delivery Date/Time*" required />
              <input type="text" className="p-2 border rounded" placeholder="Destination Address*" required />
              <input name="destinationCity" type="text" className="p-2 border rounded" placeholder="Destination City*" required />
              <input type="text" className="p-2 border rounded" placeholder="Zip Code*" required />
        
              <h4 className="col-span-2 font-semibold mt-4">Shipment Information</h4>
              <input type="number" className="p-2 border rounded" placeholder="Number of Items to Ship*" required />
              <input type="text" className="p-2 border rounded" placeholder="Packaging Type*" required />
              <input type="text" className="p-2 border rounded" placeholder="Item Dimensions (inches)*" required />
              <input type="text" className="p-2 border rounded" placeholder="Total Shipment Weight (lbs)*" required />
              <input type="text" className="p-2 border rounded" placeholder="Commodity*" required />

              <h4 className="col-span-2 font-semibold mt-4">Delivery Requirements</h4>
              <div className="col-span-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Dock High Vehicle Required
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Hazmat
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Truck with Lift Gate Required
                </label>
              </div>
        
              <textarea className="col-span-2 p-2 border rounded" placeholder="Notes / Special Requirements (Optional)"></textarea>
                
               
                <Button type="submit" className="col-span-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MSMEDashboard;



