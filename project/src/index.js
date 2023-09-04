const express = require( 'express' );
const path = require( 'path' );
const app = express();
console.log( __dirname );
console.log( path.join( __dirname, "../public" ) )
const staticPath = path.join( __dirname, "../public" );
app.use( express.static(staticPath) );
// app.use();

app.get( "/", (req, res) => {
    res.send( `Bhai yeh home page hai` );
})
app.get( "/about", (req, res) => {
    res.send( `Bhai yeh about us hai` );
})
app.get( "/contact", (req, res) => {
    res.send( `Bhai yeh contact us hai` );
} )
const port = 8000;
app.listen( port, () => {
    console.log( `Hola Amigo, your port number is ${port}` );
})