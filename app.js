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
app.use(cors())
const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions",
});

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // Set secure to true if using HTTPS
        store: sessionStore,
    })
);

// Middleware to serve Swagger UI
app.use("/api/v1/", routers);
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