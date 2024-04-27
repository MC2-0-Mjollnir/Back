import express from "express";
import session from "express-session";
import { connect } from "mongoose";
import { config } from "dotenv";
import MongoStore from "connect-mongo";
import cors from "cors";
//middlewares
import handleError from "./middleware/handleError.js";
//router SSOT
import routers from "./routes/index.js";
import Swagger from "./Swagger.js";

config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:"+process.env.ORIGIN_PORT+"",
    credentials: true,
    optionsSuccessStatus: 200,
}))

//Note that you need to authenticate the user before you can use the API,
//Docs are available at /api-docs endpoint!

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: false, maxAge: 3600000 }, // One hour cookie
        store: new MongoStore({
            mongoUrl: process.env.MONGO_URI+''
        })
    })
);

// Middleware to serve Swagger UI
app.use("/api/v1", routers);
Swagger(app)
app.use('*', (req, res) => res.send("Invalid Route"));

connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server is running on port " + (process.env.PORT || 3000));
    });
})
.catch((err) => {
    console.log("Failed to connect to MongoDB", err);
});

app.use(handleError)