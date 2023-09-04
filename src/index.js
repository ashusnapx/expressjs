const express = require( 'express' );
const app = express();
const path = require( 'path' );

// console.log( __dirname );
// console.log( __filename );
// console.log( path.join(__dirname, "../public") );
const staticPath = path.join( __dirname, "../public" );
/* built in middleware */
app.use( express.static(staticPath) );

// app.get(route, callback)

app.get( "/", ( req, res ) => {
    res.send( "<h1>Hello from express!</h1>" );
} )
app.get( "/about", ( req, res ) => {
    res.send( "<h1>About page updated</h1>" );
} )
app.get( "/hola", ( req, res ) => {
    res.send( [{
        "id": 1,
        "name": "Kr$na",
        "song": "Hola Amigo"
    },
        {
            "id": 2,
            "name": "Kr$na",
            "song": "Prarthana"
        },
    ]);
} )

app.listen( "8000", () => {
    console.log( `Listening port at 8000` );
} )