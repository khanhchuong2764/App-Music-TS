import express,{ Express} from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import  BodyParser  from "body-parser";
dotenv.config();
const app:Express = express();
const port:number | string= process.env.Port || 3000;

import { RouterClient } from "./routes/client/index.route";

app.set('views', './views');
app.set('view engine', 'pug');

// parse application/x-www-form-urlencoded
app.use(BodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(BodyParser.json());

RouterClient(app);


app.use(express.static("public"));

database.connect();




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})