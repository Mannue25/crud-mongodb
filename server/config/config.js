

// =======================
// Puerto
//========================

const port = process.env.PORT || 3000;

// =============================

// BASE DE DATOS

// ==============================

// =========================

// Fecha de vencimiento del token

// ==========================

process.env.CADUCIDAD_TOKEN= 60 * 60 * 24 * 30;

// =====================
// seed DE DESARROLLO
// =====================

process.env.SEED = process.env.SEED || 'Este-es-el-seed-desarrollo'


process.env.NODE_ENV = process.env.NODE_ENV ||'dev'

let urlDB;

if(process.env.NODE_ENV === 'dev'){ 
   urlDB="mongodb://localhost:27017/cafe"
} else {
    urlDB = process.env.MONGO_URI_DB;
}



process.env.URLDB = urlDB;

//====================
// Google Client ID

// ==================

process.env.CLIENT_ID = process.env.CLIENT_ID || '355446441876-dtbnnvusk1j43rs3bg6bfore1bl8iscu.apps.googleusercontent.com'


module.exports = {
    port
}