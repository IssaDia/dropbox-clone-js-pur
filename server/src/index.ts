import express from "express";
import routes from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

console.log(process.env.CLIENT_URL);

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(
  session({
    secret: process.env.SESSIONSECRET || "",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors(corsOptions));

// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
