import express, { Request, Response } from "express";
import adminRoutes from "./routes/admin";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 6300;
app.use("/admin", adminRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
