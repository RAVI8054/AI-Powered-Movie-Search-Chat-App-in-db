
import MoviesModel from "../model/Movies.model.js";
import { callmassag } from "../../aiTool.js"

export async function yearSearch(req, res) {
    try {
        let year = req.params.year

        if (!year) {
            return res.status(404).json({ message: "year not found" });
        }
        const yearMovies = await MoviesModel.find({ year: year });
        console.log(yearMovies)
        if (yearMovies.length > 0) {
            return res.status(200).json(yearMovies)
        } else {
            return res.status(404).json({ message: "movies not find" })
        }

    } catch (err) {
        return res.status(500).json({ message: `Error: ${err.message}` });
    }
}
//searchby title
export async function titleSearch(req, res) {
    try {
        let  title  = req.params.title
        if (!title) {
            return res.status(404).json({ message: "movie name not found" });
        }
        const titleMovies = await MoviesModel.find({ title: { $regex: title, $options: 'i' } });
        console.log(titleMovies)
        if (titleMovies.length > 0) {
            return res.status(200).json(titleMovies)
        } else {
            return res.status(404).json({ message: "movies not find" })
        }

    } catch (err) {
        return res.status(500).json({ message: ` ${err.message}` });
    }
}
// search genreSearch
export async function genreSearch(req, res) {
    try {
       let genre=req.params.genre
        if (!genre) {
            return res.status(404).json({ message: "genre name not found" });
        }
        const genreMovies = await MoviesModel.find({ genre: { $regex: genre, $options: 'i' } });
        console.log(genreMovies)
        if (genreMovies.length > 0) {
            return res.status(200).json(genreMovies)
        } else {
            return res.status(404).json({ message: "genre not find" })
        }

    } catch (err) {
        return res.status(500).json({ message: `${err.message}` });
    }
}
//search rating
export async function ratingSearch(req, res) {
    try {
        let rating = req.params.rating

        const ratedMovies = await MoviesModel.find({ rating: { $gte: rating } });
        console.log(ratedMovies);

        if (ratedMovies.length > 0) {
            return res.status(200).json(ratedMovies);
        } else {
            return res.status(404).json({ message: "No movies found with given rating" });
        }

    } catch (err) {
        return res.status(500).json({ message: `${err.message}` });
    }
}

//app.post("/ai",connectAi)
export async function connectAi(req, res) {
    const { search } = req.body;
    console.log("user search::",search)
    if (!search) {
        return res.status(400).json({ message: "Search message missing" });
    }

    try {
        const aiResult = await callmassag(search);
        return res.status(200).json(aiResult); 
    } catch (err) {
        console.error("AI error:", err);
        return res.status(500).json({ error: err.message });
    }
}



