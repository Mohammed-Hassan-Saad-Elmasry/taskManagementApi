import { ConnectDB } from "./db/connection";
import express from "express";
import { Bootstrap } from "./src/index.router";
import { setupSwagger } from "./swagger";
const app = express();
setupSwagger(app);
const PORT = process.env.PORT || 3000;
app.use(express.json());
new Bootstrap(app);
new ConnectDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
