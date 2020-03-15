// =============
// PUERTO
// =============
process.env.PORT = process.env.PORT || 3000;


// =============
// ENTORNO
// =============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


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


// 'mongodb+srv://Yoshua:Camello9@cluster0-zykor.mongodb.net/cafe?retryWrites=true&w=majority'

// 'mongo "mongodb+srv://cluster0-zykor.mongodb.net/cafe"  --username Yoshua'

// 'mongodb+srv://Yoshua:Camello9@cluster0-zykor.mongodb.net/cafe'