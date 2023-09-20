import Express from "express";
import { configDotenv } from "dotenv";
import { Db } from "./config/config.js";
import route from "./routers/route.js";
import cors from "cors";
import xss from "xss-clean";
import sanitize from "express-mongo-sanitize";
import cookie from "cookie-parser";
import morgan from "morgan";
import Gauth from './routers/GauthRoutes.js'
configDotenv();
const app = Express();

app.use(Express.urlencoded({ extended: false })); 
app.use(Express.json());  
app.use(cors({ origin: [process.env.BASE_URL], credentials: true }));
app.use(cookie());
app.use(sanitize());
app.use(xss());
app.use(morgan("dev"));

Db();
app.use(Gauth)
app.use(route);
app.listen(process.env.PORT, () => {
  console.log(`CONNECTED PORT ${process.env.PORT}`);
});
 