//Leer todos los datos de la base de datos
function read(connection,callback){
    connection.query("SELECT * FROM covid19", function(err,result){
        if (err) throw err;
        callback(result);
    });
} 

//Leer datos de la base de datos con el formulario de "Buscar en la base de datos" y "Buscar por frase"
function readparametro2(connection,valor_parametro_url,valor_parametro2_url,valor_parametro3_url,callback){
    console.log ("-----------");
   var query = "SELECT *  FROM covid19 WHERE " + valor_parametro_url + valor_parametro2_url + "'"+ valor_parametro3_url + "'";
   console.log(query);
   connection.query(query,function(err,result){
        if (err) throw err;
        callback(result);
    });
} 

//Leer datos de la base de datos con el formulario de "Buscar por columnas"
function readparametro3(connection,valor_parametro_url,callback){
    console.log ("-----------");
   var query = "SELECT " +valor_parametro_url+ " FROM covid19";
   console.log(query);
   connection.query(query,function(err,result){
        if (err) throw err;
        callback(result);
    });
} 

module.exports = {read,readparametro2,readparametro3};