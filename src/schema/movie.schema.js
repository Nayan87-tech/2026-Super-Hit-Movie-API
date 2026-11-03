import mongoose, { Schema, Types } from "mongoose";

const HitMovie = new Schema (
    {
     Rank:{type:String, unique:true, trim:true},
     MovieName:{type:String, unique:true, trim:true},
     ReleaseDate:{type:String, required:true, trim:true},
     WorldWideCollection:{type:String, required:true, trim:true},
     image : {type:String, default:""}
    },
    {
        timestamps:true
    }
)

const movie = mongoose.model("MovieData",HitMovie);
export default movie;