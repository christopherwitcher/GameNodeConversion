import {AssetManager} from './modules/engine/AssetManager.mjs' //Error can not use import statement outside a module #TODO change to module later

import * as http from 'http';
import * as path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const route = ('./routes');
const app = express();
const port = process.env.port || 5000
//const bodyParser = bodyParser;

app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(path.join(__dirname, '/public')));

app.use(['/public/js/AssetManager', '/public/js/load']);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

/*
 * Dowload required Images
 */

let heroSpriteSheet = "./img/runboySprite.png"; //If it comes up undefined try changing to var
let backImg = "./img/neighBackgroundext.png";

var ASSET_MANAGER = AssetManager;
ASSET_MANAGER.queueDownload(backImg);
ASSET_MANAGER.queueDownload(heroSpriteSheet);

app.

//app.get('/', route);
app.get('/', (req, res) => {
    res.render('GameBoard');
})


app.get('/', (req, res) => {
    res.send('Siblinge Node Refactor!')
  });

app.use((req, res,next)=>{
   res.status(404).send('<h1> Page not found </h1>');
});

const server = http.createServer(app);
server.listen(port, () => {
    console.log('Game Board app listening at http://localhost:' + port);
});


/* app.get('/', (req, res) => {
  res.send('Siblinge Node Refactor!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) */