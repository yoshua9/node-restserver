// =============
// PUERTO
// =============
process.env.PORT = process.env.PORT || 3000;


// =============
// ENTORNO
// =============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// =============
// VENCIMIENTO DEL TOKEN
// =============

process.env.CADUCIDAD_TOKEN = '48h';

// =============
// SEED
// =============

process.env.SEED = process.env.SEED || 'Secret-desarrollo';

// =============
// BASE DE DATOS
// =============

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


// =============
// CLIENT ID
// =============

process.env.CLIENT_ID = process.env.CLIENT_ID || '626410070483-5t8j2eb6stmv9sks58lo0u32fgfdv7p2.apps.googleusercontent.com';