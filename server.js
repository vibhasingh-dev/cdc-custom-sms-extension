const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/send-sms", async (req, res) => {
    try {

        console.log("Incoming request:", req.body);

        const phone = req.body?.data?.to;
        const message = req.body?.data?.text;

        if (!phone || !message) {
            return res.status(400).json({ status: "FAILED", reason: "Missing data" });
        }

        console.log(`Sending SMS to ${phone}`);

        // 🔹 CALL YOUR SMS PROVIDER HERE
        await axios.post("https://your-sms-provider.com/api/send", {
            to: phone,
            message: message
        }, {
            headers: {
                Authorization: `Bearer ${process.env.SMS_API_KEY}`
            }
        });

        return res.status(200).json({ status: "SUCCESS" });

    } catch (error) {
        console.error("SMS error:", error.message);
        return res.status(500).json({ status: "FAILED" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
