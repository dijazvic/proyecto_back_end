import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
//import session from 'express-session';
import mongoose from 'mongoose';
//Passport imports
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

//Routers
import viewsRouter from './routes/index.js'

const app = express();

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));


const MONGO_URL = "mongodb://localhost:27017/clase21?retryWrites=true&w=majority";

//Cookies
//router.use(cookieParser());
app.use(cookieParser("CoderS3cr3tC0d3"));

//Middlewares Passport
initializePassport();
app.use(passport.initialize());
//app.use(passport.session());

app.use("/", viewsRouter);

const SERVER_PORT = 9090;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();