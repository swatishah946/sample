import React from "react";

const AnalyticsReports = () => {
  const analytics = [
    { label: "Total Users", value: "5,234" },
    { label: "Total Transactions", value: "₹1.2 Cr" },
    { label: "Support Tickets Open", value: "12" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Analytics & Reports</h2>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {analytics.map((metric, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-gray-600">{metric.label}</p>
            <p className="text-xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue & Shipment Insights */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-md font-bold mb-2">Revenue & Shipments</h3>
        <p className="text-gray-600">Detailed revenue trends and shipment reports coming soon...</p>
      </div>
    </div>
  );
};

export default AnalyticsReports;
