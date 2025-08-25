import { yearSearch, titleSearch, genreSearch, ratingSearch, connectAi } from "../controllers/search.controllers.js"

 export default  function searchRoutes(app){
    app.get("/year/:year",yearSearch);
    app.get("/title/:title", titleSearch);
     app.get("/genre/:genre", genreSearch);
    app.get("/rating/:rating",  ratingSearch)
    app.post("/ai",connectAi)
}