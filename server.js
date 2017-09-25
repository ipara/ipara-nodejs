const express = require('express');
const exphbs = require('express-handlebars');
const routers = require("./routers/index");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const app = express();


const port = process.env.PORT || 3000;


app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(express.static("./public"))
    .engine('.hbs', exphbs({
        extname: '.hbs'
    }))
    .set('view engine', '.hbs')
    .use("/", routers.app)
    .use("/api", routers.api)
    .use((req, res, next) => {
        res.status(404).send('Not found !');
        next()
    })
    .listen(port, _ => {
        console.log(`iPara projesi şu url de çalışıyor : http://localhost:${port} `);
    });