import movie from "../schema/movie.schema.js";
import jwt from "jsonwebtoken";
import { uploadFileToImage } from "../service/storage.js";

// post api 
export const movies = async (req, res) => {
  try {
    const { Rank, MovieName, ReleaseDate, WorldWideCollection } = req.body;
    const FileUpload = req.file;

    if (!Rank || !MovieName) {
      return res.status(400).json({ message: "You Miss Something!" });
    }

    const isMovieExists = await movie.findOne({ Rank, MovieName });
    if (isMovieExists) {
      return res.status(400).json({ message: "Movie Details Already Exists!" });
    }
    // image upload
    const uploadFile = await uploadFileToImage(
      FileUpload.buffer,
      FileUpload.originalname,
    );
    // new user
    const newUser = new movie({
      Rank,
      MovieName,
      ReleaseDate,
      WorldWideCollection,
      image: uploadFile.url,
    });
    // console.log("DB_USER", newUser);

    const data = await newUser.save();
    // console.log("DB_DATA", data);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN, {
      expiresIn: "2h",
    });
    // console.log(token);
    res
      .status(201)
        .cookie("token", token, {
          httpOnly: true,
        })
      .json({ message: "Movies Details Added Succesfully!",token });
  } catch (error) {
    console.error("Movie Upload Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",error
    });
  }
};

// get api
export const getMovies = async (req, res) => {
    try {
        const allMovies = await movie.find();
        return res
            .status(200)
            .json({
              success:true,
              totalMovies: allMovies.length,
              message:"All Movie Data",
              movies:allMovies});
} catch (error) {
      console.log(error)
        return res
            .status(500)
            .json({ message: error.message});
    }
};