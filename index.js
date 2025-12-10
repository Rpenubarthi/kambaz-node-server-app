import express from 'express';
import mongoose from "mongoose";
import Lab5 from "./Lab5/index.js";
import cors from 'cors';
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import "dotenv/config";
import session from "express-session";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import PostRoutes from "./Kambaz/Pazza/Posts/routes.js";
import AnswerRoutes from "./Kambaz/Pazza/Answers/routes.js";
import DiscussionRoutes from "./Kambaz/Pazza/Discussions/routes.js";
import FolderRoutes from "./Kambaz/Pazza/Folders/routes.js";



const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
})
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        // domain: process.env.SERVER_URL,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app, db);
CourseRoutes(app, db);
PostRoutes(app);
AnswerRoutes(app);
DiscussionRoutes(app);
FolderRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 4000}`);
});
