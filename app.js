//Variables
var cors = require('cors');
var valor_parametro_url, valor_parametro2_url, valor_parametro3_url;
var valor_parametro_url2;
var parametro_url =[];
var parametro_url2 =[];


//Importaciones
const express= require ("express");
const app= express();
const mysql= require ("mysql");
const {read,readparametro2,readparametro3}= require("./operations");
const bodyParser = require('body-parser');
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));




//Conexión BBDD
const connection =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Kira1560",
    database:"datos",
});

//Comprobación que el servidor está arrancado
connection.connect((err)=> {
    if (err) throw err;
    console.log("Base de datos conectada");
});

app.listen(3000,()=>{
    console.log("Servidor en puerto 3000");
});


//MÉTODOS

//Url base
app.get("/", (req,res)=>{
    res.send("Hello World");
});

//Leer todos los datos
app.get("/read", (req,res) =>{
  
    read(connection, (result)=>{
        res.json(result);
    });
});

//Leer datos con ciertos parámetros
app.get("/read2", (req,res) =>{
  
    readparametro2(connection, valor_parametro_url, valor_parametro2_url,valor_parametro3_url,(result)=>{
        res.json(result);
    });

});

app.get("/read3", (req,res) =>{
  
    readparametro3(connection, valor_parametro_url2,(result)=>{
        res.json(result);
    });

});

//Recoger parámetros formulario 
app.get("/recogerparametro", (req, res) => {

    parametro_url=req.query; 
    console.log(parametro_url);
    valor_parametro_url=parametro_url[Object.keys(parametro_url)[0]];
    valor_parametro2_url=parametro_url[Object.keys(parametro_url)[1]];
    valor_parametro3_url=parametro_url[Object.keys(parametro_url)[2]];
    res.send(parametro_url);	

    console.log(valor_parametro_url);
    console.log(valor_parametro2_url);
    console.log(valor_parametro3_url);
});

app.get("/recogerparametro2", (req, res) => {
     

    parametro_url2=req.query; 
    console.log(parametro_url2);
    valor_parametro_url2=parametro_url2[Object.keys(parametro_url2)[0]];
    res.send(parametro_url2);	
    console.log(valor_parametro_url2);
  
});

app.get("/recogerparametrofrase", (req, res) => {
     

    parametro_url=req.query; 
    console.log(parametro_url);
      
    valor_parametro_url=parametro_url[Object.keys(parametro_url)[0]];
    valor_parametro2_url=parametro_url[Object.keys(parametro_url)[1]];
    valor_parametro3_url=parametro_url[Object.keys(parametro_url)[2]];
    res.send(parametro_url);	

    
    console.log(valor_parametro_url);
    console.log(valor_parametro2_url);
    console.log(valor_parametro3_url);
});


module.exports = {app};