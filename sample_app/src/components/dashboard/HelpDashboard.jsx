import { useState, useEffect } from "react";
import { FaQuestionCircle, FaPhone, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { getFAQs, getContactInfo, sendMessage } from "../api/help";

const HelpDashboard = () => {
  const [faqs, setFaqs] = useState([]);
  const [contact, setContact] = useState({});
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Fetch FAQs and Contact Info on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const faqData = await getFAQs();
        setFaqs(faqData);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setFaqs([]);
      }

      try {
        const contactData = await getContactInfo();
        setContact(contactData);
      } catch (error) {
        console.error("Error fetching contact info:", error);
        setContact({});
      }
    }
    fetchData();
  }, []);

  // Handle sending message
  const handleSendMessage = async () => {
    if (!message.trim()) {
      setResponseMessage("❌ Message cannot be empty.");
      return;
    }

    try {
      const response = await sendMessage("user123", message); // Replace "user123" with actual user ID
      if (response?.success) {
        setResponseMessage("✅ Your message has been sent to support!");
        setMessage("");
      } else {
        setResponseMessage("❌ Failed to send message. Try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setResponseMessage("❌ An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        <FaQuestionCircle className="mr-2 text-blue-500" /> Help & Support
      </h2>

      {/* FAQs Section */}
      <h3 className="text-lg font-semibold mb-2">📌 Frequently Asked Questions</h3>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <li key={index}>
              <strong>{faq.question}</strong> - {faq.answer}
            </li>
          ))
        ) : (
          <li>No FAQs available at the moment.</li>
        )}
      </ul>

      {/* Contact Support Section */}
      <h3 className="text-lg font-semibold mt-4">📞 Contact Support</h3>
      <div className="flex items-center space-x-3">
        <FaPhone className="text-green-500" />
        <span>{contact?.phone || "Contact number unavailable"}</span>
      </div>
      <div className="flex items-center space-x-3 mt-2">
        <FaEnvelope className="text-red-500" />
        <span>{contact?.email || "Email not available"}</span>
      </div>

      {/* Send Message Section */}
      <h3 className="text-lg font-semibold mt-6">💬 Send us your question</h3>
      <div className="flex mt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <FaPaperPlane className="mr-1" /> Send
        </button>
      </div>

      {/* Response Message */}
      {responseMessage && (
        <p className="mt-3 text-sm text-gray-600">{responseMessage}</p>
      )}
    </div>
  );
};

export default HelpDashboard;
