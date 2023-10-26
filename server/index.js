import express from "express";
import cors from "cors";
import authRouter from "./routers/auth.router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
