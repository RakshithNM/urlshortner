import "reflect-metadata";
import * as dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './database';
import * as express from "express";
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from "body-parser";
import { nanoid } from 'nanoid'
import { Url } from "./entity/Url";

const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const urls = await Url.find();
  res.render("index", {
    urls
  });
});

app.post('/shorten', async (req: Request, res: Response, next: NextFunction) => {
  const url = new Url();
  url.fullUrl = req.body.fullUrl;
  url.shortUrl = nanoid(8);
  await url.save();
  res.redirect("/");
})

app.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const currentUrl = await Url.findOne({ shortUrl : req.params.id });
  res.redirect(currentUrl.fullUrl);
})

const port: Number = Number(process.env.PORT) || 3000;
const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

(async () => {
    await connectDB();
    await startServer();
 })();
