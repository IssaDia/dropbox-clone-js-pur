import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import { sequelize } from "./infrastructure/database/models";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:5001',
  'https://fonts.gstatic.com',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("CORS blocked for origin: ", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());


app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      sameSite: 'lax',
    },
  })
);


app.use("/api", routes);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error stack: ", err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message,
  });
});


const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database.');

    await sequelize.sync({ alter: true });
    console.log('Database models synchronized.');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

startServer();
