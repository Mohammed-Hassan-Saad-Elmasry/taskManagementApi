import { ConnectDB } from "./db/connection";
import express from "express";
import { Bootstrap } from "./src/index.router";
import { setupSwagger } from "./swagger";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
new Bootstrap(app);
new ConnectDB();
setupSwagger(app);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
export const server= app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
