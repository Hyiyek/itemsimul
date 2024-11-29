import express from "express";
import { prisma } from "../utils/prisma/index.js";
import authMiddleware from "../src/middlewares/auth.middleware.js";
const router = express.Router();
// 캐릭터 를 router.post를통해만드는로직
router.post("/character", authMiddleware, async (req, res) => {
  const { charactername } = req.body;
  const { userId } = req.user;

  const characters = await prisma.character.create({
    data: {
      userId,
      charactername,
    },
  });
  return res.status(201).json({ data: characters });
});
// 캐릭터를 router.get을 통해 캐릭터를조회하는 로직
router.get("/character", async (req, res) => {
  const characters = await prisma.character.findMany({
    select: {
      characterId: true,
      userId: true,
      charactername: true,
      stats: true,
      attackPower: true,
      money: true,
    },
    orderBy: {
      characterId: "asc",
    },
  });
  return res.status(200).json({ data: characters });
});
// 캐릭터 상세조회 api
router.get("character/:characterdatasId", async (req, res) => {
  const { characterId } = req.params;

  const characters = await prisma.character.findFirst({
    where: { characterId: +characterId },
    select: {
      characterId: true,
      userId: true,
      charactername: true,
      stats: true,
      attackPower: true,
      money: true,
    },
  });
  return res.status(200).json({ data: characters });
});

export default router;
