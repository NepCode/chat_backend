import express from 'express'
import http from 'http'
/* import socketio from 'socketio' */
import colors from 'colors'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from '../config/db.js'

import userRoutes from '../routes/userRoutes.js'
import messageRoutes from '../routes/messageRoutes.js'
import { errorHandler, notFound } from '../middleware/errorMiddleware.js'


class Server {

    constructor() {

        dotenv.config()

        connectDB()

        this.app  = express();
        this.port = process.env.PORT || 5000

        this.server = http.createServer( this.app );
        
    }

    middlewares() {

        this.app.use(cors());
        this.app.use(express.json());
        
        this.app.use( '/api/v1/users', userRoutes );
        this.app.use( '/api/v1/messages', messageRoutes );

        this.app.use(notFound);
        this.app.use(errorHandler);
    }s



    execute() {

        this.middlewares();
        this.server.listen( this.port , console.log(`Server running in ${process.env.NODE_ENV} on port ${this.port} ` ));
    }

}


export default Server;