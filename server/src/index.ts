import express from "express";
import routes from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 5,
    },
  })
);

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};


app.use(cors(corsOptions));

// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
