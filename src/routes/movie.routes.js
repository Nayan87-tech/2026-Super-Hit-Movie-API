import { Router } from "express";
import { getMovies, movies } from "../controller/movie.controller.js";
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post("/movies",upload.single("uploadfile"),movies)
router.get("/movies",getMovies)

export default router;