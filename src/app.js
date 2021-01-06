import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

const { log } = console;

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.status(200).json({
    message: "Welcome to Getir Tech Challenge",
  })
);

app.all("*", (req, res) =>
  res.status(404).json({
    error: "Path not found.",
  })
);

app.listen(PORT, () => {
  log(`Server listening on port ${PORT}`);
});

export default app;
