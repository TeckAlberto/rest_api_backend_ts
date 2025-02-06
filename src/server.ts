import express from "express";
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUIOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

// Connect to the database
export async function connect() {
    try {
        await db.authenticate();
        db.sync();
        //console.log(colors.magenta.bold("Connection has been established successfully."));
        
    } catch (error) {
        //console.error(error);
        console.log(colors.red.bold("There was an error connecting to the database"));
    }
}

connect();

// Create the server
const server: express.Application = express();

// Enable Connections
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if (origin === process.env.FRONTED_URL) {
          callback(null, true);
        } else {
          callback(new Error('CORS error'))
        }
    }
}

server.use(cors(corsOptions));

// Read form's data
server.use(express.json());

server.use(morgan('dev'));

server.use('/api/products', router);

// Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUIOptions)
);

server.use(express.static("public"));

export default server;