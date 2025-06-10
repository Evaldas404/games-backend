import express from "express";
import auth from "../middlewares/auth.js";

import {
  DELETE_BY_ID,
  ALL_GAMES,
  GAME_BY_ID,
  INSERT,
  UPDATE_BY_ID,
} from "../controllers/games.js";

const router = express.Router();

router.get("/", auth, ALL_GAMES);
router.get("/:id", auth, GAME_BY_ID);
router.post("/", auth, INSERT);
router.put("/:id", auth, UPDATE_BY_ID);
router.delete("/:id", auth, DELETE_BY_ID);

export default router;
