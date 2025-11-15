import express from 'express';
import Lab5 from "./Lab5/index.js";
import cors from 'cors';
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";





const app = express();
app.use(cors());
app.use(express.json());
Lab5(app);
UserRoutes(app, db);
app.listen(process.env.PORT || 4000);
