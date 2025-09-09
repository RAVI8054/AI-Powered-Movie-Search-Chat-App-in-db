import express from 'express'
const app=express();
import mongoose  from 'mongoose'
import searchRoutes from "./src/routes/search.routes.js"
import  cors from 'cors'
app.use(cors())
//import seedDB from './seed/seed.js';
//seedDB(app)
mongoose.connect('mongodb+srv://ravimrvr:IvHlWZdsjDacxzol@cluster0.z1nmh6r.mongodb.net/'
)
    .then(() => {
        console.log("DB CONNECTED");
    })
    .catch((err) => {
        console.log("DB NOT CONNECTED", err.message);
    });

//midllerware
//   parsing JSON request
app.use(express.json());
// routes
searchRoutes(app)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`server connected ${PORT}`);

})

