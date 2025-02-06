// Dummy data for FAQs and Contact Info
const faqs = [
    { question: "How do I track my shipments?", answer: "Go to the tracking page and enter your shipment ID." },
    { question: "How do I create a new shipment order?", answer: "Navigate to the 'New Order' section and fill in the details." },
    { question: "Can I update my shipment details after booking?", answer: "Yes, you can edit details within 24 hours of booking." },
    { question: "How do I contact customer support?", answer: "You can email us or call our support number." },
  ];
  
  const contact = {
    phone: "+91 12345 67890",
    email: "support@easelogi.com",
  };
  
  // Get FAQs
  exports.getFAQs = (req, res) => {
    res.json(faqs);
  };
  
  // Get Contact Info
  exports.getContactInfo = (req, res) => {
    res.json(contact);
  };
  
  // Send Message
  exports.sendMessage = async (req, res) => {
    try {
      const { userId, message } = req.body;
  
      if (!message || !userId) {
        return res.status(400).json({ success: false, error: "User ID and message are required." });
      }
  
      // Simulating database storage (replace with actual DB logic)
      console.log(`Message received from user ${userId}: ${message}`);
  
      return res.json({ success: true, message: "Your message has been sent to support!" });
    } catch (error) {
      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  };
  