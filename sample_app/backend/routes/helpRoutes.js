const express = require("express");
const router = express.Router();
const helpController = require("../controllers/helpController");

// Routes
router.get("/faqs", helpController.getFAQs);
router.get("/contact", helpController.getContactInfo);
router.post("/send-message", helpController.sendMessage);

module.exports = router;
