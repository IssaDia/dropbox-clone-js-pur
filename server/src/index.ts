import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import { sequelize } from "./infrastructure/database/models";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Define all your allowed origins  
const allowedOrigins = [
  'http://localhost:8080',  
  'http://localhost:5001', 
  'https://fonts.gstatic.com',
  
];



const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const origin = req.headers.origin;
  console.log("Request Origin: ", origin);

  if (origin && allowedOrigins.includes(origin)) {
    console.log("CORS allowed for origin: ", origin);
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    console.warn("CORS blocked for origin: ", origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
};





// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      sameSite: 'lax'
    }
  })
);

app.options('*', corsMiddleware);


app.use(corsMiddleware);
app.use(express.json());
app.use("/api", routes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');
  
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
    process.exit(1);
  }
})();