import express,{ Express} from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import  BodyParser  from "body-parser";
import moment from "moment";
import path from "path";
dotenv.config();
const app:Express = express();
const port:number | string= process.env.Port || 3000;

import { RouterClient } from "./routes/client/index.route";
import { RouterAdmin } from "./routes/admin/index.route";
import { systemConfig } from "./config/system";

app.set('views', './views');
app.set('view engine', 'pug');
app.locals.moment = moment;
// parse application/x-www-form-urlencoded
app.use(BodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(BodyParser.json());

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

RouterClient(app);
RouterAdmin(app);

app.locals.prefixAdmin = systemConfig.preFixAdmin

app.use(express.static("public"));

database.connect();




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})