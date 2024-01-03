import express from "express";
import connectDB from "./connectDB.js";
import { PORT, DB_URL } from "./config.js";
import bookRoute from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS POLICY
// option 1. Allow all origins with default of cors(*)
app.use(cors());
// option 2. Allow custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// connect the DB
connectDB(DB_URL);
app.get("/", (req, res) => {
  return res.status(200).send("Well come to this thing");
});

// Routes
app.use("/books", bookRoute);

app.listen(PORT, () => console.log(`App is listening to port: ${PORT}`));
