import express,{ Express} from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
dotenv.config();
const app:Express = express();
const port:number | string= process.env.Port || 3000;

import { RouterClient } from "./routes/client/index.route";

app.set('views', './views');
app.set('view engine', 'pug');


RouterClient(app);


app.use(express.static("public"));

database.connect();




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})