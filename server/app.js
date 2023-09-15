import Express from "express";
const app = Express();
import { configDotenv } from "dotenv";
configDotenv();
import { Db } from "./config/config.js";
import route from "./routers/route.js";
import cors from "cors";
import xss from "xss-clean";
import sanitize from "express-mongo-sanitize";
import cookie from "cookie-parser";
import morgan from "morgan";

app.use(cors({ origin: "*", credentials: true }));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(cookie());
app.use(sanitize());
app.use(xss());
app.use(morgan("dev"));

Db();
app.use(route);
app.listen(process.env.PORT, () => {
  console.log(`CONNECTED PORT ${process.env.PORT}`);
});
