require("dotenv/config");
const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

server.post("/api/v1/auth/google", async (req, res) => {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  console.log(ticket);

  const payload = ticket.getPayload();
  console.log(payload);

  return res.status(201).json(payload);
});

server.listen(3333);
