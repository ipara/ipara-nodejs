const express = require("express");
const exphbs = require("express-handlebars");
const routers = require("./routers/index");
const cookieParser = require("cookie-parser");

const port = require("./settings").PORT;
const hosturl = require("./settings").HOST_URL;

const app = express();

app.use(express.json())
    .use(
        express.urlencoded({
            extended: true,
        })
    )
    .use(cookieParser())
    .use(express.static("./public"))
    .engine(
        ".hbs",
        exphbs({
            defaultLayout: false,
            extname: ".hbs",
        })
    )
    .set("view engine", ".hbs")
    .use("/", routers.app)
    .use("/api", routers.api)
    .use((req, res, next) => {
        res.status(404).send("Not found !");
        next();
    })
    .listen(port, (_) => {
        console.log(
            "\x1b[36m%s\x1b[0m",
            "iPara projesi şu url de çalışıyor : " + `${hosturl}`
        );
        console.log(
            "\x1b[32m%s\x1b[0m",
            "- Server'i durdurmak icin terminali kapatin ya da terminalde CTRL-C tuşlayın -"
        );
    });
