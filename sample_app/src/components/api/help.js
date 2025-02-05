const BASE_URL = "http://localhost:5173/api/help"; // Change if deployed

// Fetch FAQs
export const getFAQs = async () => {
    try {
        const response = await fetch(`${BASE_URL}/faqs`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return [];
    }
};

// Fetch Contact Info
export const getContactInfo = async () => {
    try {
        const response = await fetch(`${BASE_URL}/contact`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching contact info:", error);
        return null;
    }
};

// Send Message
export const sendMessage = async (userId, message) => {
    try {
        const response = await fetch(`${BASE_URL}/send-message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, message }),
        });

        return await response.json();
    } catch (error) {
        console.error("Error sending message:", error);
        return { success: false };
    }
};
