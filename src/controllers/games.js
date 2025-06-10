import { v4 as uuidv4 } from "uuid";
import GamesModel from "../models/videogames.js";

const games = [];

export const INSERT = async (req, res) => {
  try {
    const existingGame = await GamesModel.findOne({ title: req.body.title });

    if (existingGame) {
      return res.status(404).json({
        message: `Game ${req.body.title} already exist`,
      });
    }

    const game = {
      ...req.body,
      id: uuidv4(),
      createdAt: new Date(),
    };

    const response = new GamesModel(game);

    const data = await response.save();

    games.push(game);

    res.status(201).json({
      message: "Game was added",
      video_game: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "There is error",
    });
  }
};

export const ALL_GAMES = async (req, res) => {
  try {
    const games = await GamesModel.find({deleted:false});
    res.status(200).json({
      games: games,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "There is error",
    });
  }
};

export const GAME_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    const game = await GamesModel.findOne({ id: id });

    if (!game) {
      return res.status(404).json({
        message: "This game does not exist",
      });
    }
    return res.status(200).json({
      message: "Your game",
      video_game: game,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "There is error",
    });
  }
};

export const UPDATE_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    const game = await GamesModel.findOneAndUpdate(
      { id: id },
      { ...req.boyd },
      { new: true }
    );
    if (!game) {
      return res.status(404).json({
        message: "This video game does not exist",
      });
    }
    return res.status(200).json({
      message: "Updated video game",
      game: game,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "There is error",
    });
  }
};

export const DELETE_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    const game = await GamesModel.findOneAndUpdate(
      { id, deleted: true },
      { deleted: true },
      { new: true }
    )
    if (!game) {
      return res.status(404).json({
        message: "This video game does not exist",
      });
    }

    return res.status(200).json({
      message: "Video game was soft deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "There is error",
    });
  }
};
