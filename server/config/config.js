

// =======================
// Puerto
//========================

const port = process.env.PORT || 3000;

// =============================

// BASE DE DATOS

// ==============================


process.env.NODE_ENV = process.env.NODE_ENV ||'dev'

let urlDB;

if(process.env.NODE_ENV === 'dev'){ 
   urlDB="mongodb://localhost:27017/cafe"
} else {
    urlDB = process.env.MONGO_URI_DB;
}



process.env.URLDB = urlDB;


module.exports = {
    port
}