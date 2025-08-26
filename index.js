const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// ================== ROUTES ==================
app.get("/", (req, res) => {
  res.send("✅ Instagram API is running!");
});

// Example: /api/instagram?url=INSTAGRAM_LINK
app.get("/api/instagram", async (req, res) => {
  let url = req.query.url;
  if (!url) return res.status(400).json({ error: "❌ Please provide an Instagram URL!" });

  try {
    // এখানে free scraper API ব্যবহার করা হচ্ছে fallback হিসেবে
    let response = await axios.get(`https://www.saveinsta.net/api?url=${encodeURIComponent(url)}`);

    if (!response.data) return res.status(500).json({ error: "❌ Failed to fetch Instagram media!" });

    return res.json({
      success: true,
      data: response.data
    });

  } catch (err) {
    console.error("Error fetching Instagram:", err.message);
    res.status(500).json({ error: "❌ API fetch failed. Try again later!" });
  }
});

// ================== START SERVER ==================
app.listen(PORT, () => {
  console.log(`🚀 Instagram API running on port ${PORT}`);
});
