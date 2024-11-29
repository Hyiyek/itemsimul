// src/app.js

import express from "express";
import cookieParser from "cookie-parser";
import sign_up from "./routes/sign_up.js";
import charactercrate from "./routes/character.create.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api", [sign_up, charactercrate]);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
