const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr) => {
  console.log("\n================================");
  console.log("📱 Scan this QR with WhatsApp");
  console.log("================================\n");

  qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  console.log("✅ WhatsApp Authenticated");
});

client.on("ready", () => {
  console.log("🚀 WhatsApp Connected");
});

client.on("auth_failure", (msg) => {
  console.log("❌ Auth Failed:", msg);
});

client.initialize();

async function sendWhatsApp(phone, message) {
  try {
    const cleaned = phone.replace(/\D/g, "");

    const finalNumber = cleaned.startsWith("91")
      ? cleaned
      : "91" + cleaned;

    console.log("Checking:", finalNumber);

    const numberId = await client.getNumberId(finalNumber);

    console.log("Number ID:", numberId);

    if (!numberId) {
      console.log("❌ This number is not registered on WhatsApp.");
      return;
    }

    await client.sendMessage(numberId._serialized, message);

    console.log("✅ WhatsApp Sent Successfully!");

  } catch (err) {
    console.error("❌ WhatsApp Error:", err);
  }
}

module.exports = {
  sendWhatsApp,
};