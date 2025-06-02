import express from "express";

import {
  DELETE_GAME_BY_ID,
  GET_ALL_GAMES,
  GET_GAME_BY_ID,
  INSERT_GAME,
  UPDATE_GAME_BY_ID,
} from "../controllers/games.js";

const router = express.Router();

router.get("/videogames", GET_ALL_GAMES);
router.get("/videogames/:id", GET_GAME_BY_ID);
router.post("/videogames", INSERT_GAME);
router.put("/videogames/:id", UPDATE_GAME_BY_ID);
router.delete("/videogames/:id", DELETE_GAME_BY_ID);

export default router;
