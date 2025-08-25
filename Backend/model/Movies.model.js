import mongoose from 'mongoose';
const { Schema } = mongoose;

const MoviesSchema = new Schema({
    title: String,
    year: Number,
    genre: String,
    country: String,
    rating: Number,
    description:String
});

const MoviesModel = mongoose.model('MoviesData',MoviesSchema);
export default MoviesModel;
