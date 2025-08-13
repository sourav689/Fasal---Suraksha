const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper to format phone numbers
const formatPhoneNumber = (phoneNumber) => {
  return phoneNumber.startsWith("+91") ? phoneNumber : `+91${phoneNumber}`;
};

// Infobip API credentials
const INFOBIP_API_KEY = process.env.INFOBIP_API_KEY;
const INFOBIP_BASE_URL = process.env.INFOBIP_BASE_URL;

// Send SMS Route
app.post("/send-sms", async (req, res) => {
  const { phoneNumber, temperature, location } = req.body;

  const missingFields = [];
  if (!phoneNumber) missingFields.push("phoneNumber");
  if (!temperature) missingFields.push("temperature");
  if (!location) missingFields.push("location");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Missing required fields",
      missingFields: missingFields,
    });
  }

  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

  if (temperature <= 20) {
    return res.status(200).json({
      message: `No SMS sent as the temperature (${temperature}°C) is not above 20°C.`,
    });
  }

  const messageText = `Testing Alert: The temperature in ${location} is ${temperature}°C. This is a test message.`;

  try {
    const response = await axios.post(
      `${INFOBIP_BASE_URL}/sms/2/text/advanced`,
      {
        messages: [
          {
            destinations: [{ to: formattedPhoneNumber }],
            from: "InfoSMS", // or a sender ID approved by Infobip
            text: messageText,
          },
        ],
      },
      {
        headers: {
          Authorization: `App ${INFOBIP_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("SMS sent successfully:", response.data);
    res.status(200).json({
      message: "SMS sent successfully",
      response: response.data,
    });
  } catch (error) {
    console.error("Error sending SMS:", error.response?.data || error.message);
    res.status(500).json({
      message: "Failed to send SMS",
      error: error.response?.data || error.message,
    });
  }
});

// Start server
const localIp = "0.0.0.0";
app.listen(PORT, localIp, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
