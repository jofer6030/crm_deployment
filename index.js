const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

//Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors')

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//crear el servidor
const app = express();

//Carpeta publica
app.use(express.static('uploads'));

//bodyparser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Definir un dominio o dominios para recibir peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        // console.log(origin)
        //Revisar si la peticion viene de un servidor que esta en whitelist
        const existe = whitelist.some( dominio => dominio === origin);
        if(existe) {
            callback(null, true); //null que no hay error y true q vaya al siguiente middelware
        }else {
            callback(new Error('No permitido por CORS'))
        }
    }
};

//Habilitar cors
app.use(cors(corsOptions));

//Rutas de la app
app.use('/', routes());



const host = process.env.HOST || '0.0.0.0'; //heroku adoptara el 0.0.0.0 y aognara un host
const port = process.env.PORT || 5000; //heroku asingnara un puerto 


//iniciar app
app.listen(port, host, ()=> {
    console.log('El servidor esta funcionando')
});