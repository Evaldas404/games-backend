import { v4 as uuidv4 } from "uuid";
import VideoGamesModel from "../models/videogames.js";

let videoGames = [];

export const INSERT_GAME = async (req, res) => {
  try {
    const videoGame = {
      id: uuidv4(),
      title: req.body.title,
      price: req.body.price,
      imgURL: req.body.imgURL,
    };

    const response = new VideoGamesModel(videoGame);

    const data = await response.save();

    videoGames.push(videoGame);

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

export const GET_ALL_GAMES = async (req, res) => {
  try {
    const videoGames = await VideoGamesModel.find();
    res.status(200).json({
      videoGames: videoGames,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "There is error",
    });
  }
};

export const GET_GAME_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    const videoGame = await VideoGamesModel.findOne({ id: id });

    if (!videoGame) {
      return res.status(404).json({
        message: "This video game does not exist",
      });
    }
    return res.status(200).json({
      message: "Your game",
      video_game: videoGame,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "There is error",
    });
  }
};

export const UPDATE_GAME_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    const videoGame = await VideoGamesModel.findOneAndUpdate(
      { id: id },
      { ...req.boyd },
      { new: true }
    );
    if (!videoGame) {
      return res.status(404).json({
        message: "This video game does not exist",
      });
    }
    return res.status(200).json({
      message: "Updated video game",
      videoGame: videoGame,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "There is error",
    });
  }
};

export const DELETE_GAME_BY_ID = async (req, res) => {
  try {
    const id = req.params.id;
    const videoGame = await VideoGamesModel.findOneAndDelete({ id: id });
    if (!videoGame) {
      return res.status(404).json({
        message: "This video game does not exist",
      });
    }

    const filteredVideoGames = videoGames.filter((v) => v.id !== id);

    videoGames = filteredVideoGames;

    return res.status(200).json({
      message: "Video game was deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "There is error",
    });
  }
};
