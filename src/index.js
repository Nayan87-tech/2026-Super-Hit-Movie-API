import express from "express"
import dotenv from "dotenv"
import hitmovies from "./routes/movie.routes.js"
import movieHit from "./config/database.js";
import cors from "cors";

dotenv.config();

const app = express()
const port = process.env.PORT || 3030;
app.use(cors({
    origin: ["http://localhost:5173", "https://moviesfrontend-rouge.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

movieHit();

app.get("/",(req, res)=>{
    res.json({message:"Super Hit Movies 2026"})
});

app.use("/api/v1/superhitmovies", hitmovies)

app.listen(port, () =>{
    console.log(`server is running on port http://localhost:${port}`)
})