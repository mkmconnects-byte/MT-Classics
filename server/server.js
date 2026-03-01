const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Backend running ✅"));

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ ok: false, error: "Missing fields" });
  }

  // Debug: check env loaded
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.TO_EMAIL) {
    return res.status(500).json({
      ok: false,
      error: "ENV not loaded. Check .env and restart server.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const safeSubject = subject.trim() || "No subject";

    await transporter.sendMail({
      from: `"MT Classics Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `[MT Classics] ${safeSubject} — from ${name}`,
      text:
        `New contact message:\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Subject: ${safeSubject}\n\n` +
        `Message:\n${message}\n`,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: err?.message || String(err),
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});