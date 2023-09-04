/* 
Types of middlewares - 
1. Application-level middleware ✅
2. 3rd party middleware
3. Router-level middleware ✅
4. Built-in middleware
5. Error-handling middleware ✅
*/

const express = require( 'express' );
const path = require( 'path' );
const logger = require( 'morgan' );
const multer = require( 'multer' );
const router = express.Router();
const app = express();
const port = 8000;
const upload = multer( { dest: "./public/uploads" } );

// built in middleware
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
// console.log( path.join( __dirname, "./public" ) );
const staticPath = path.join( __dirname, "./public" );
app.use("/static", express.static( staticPath ) );

const loggerMiddleware = (req, res, next) => {
    console.log( `${ new Date() } --- Request [${ req.method }] [${ req.url }]` );
    next();
}
app.use( loggerMiddleware );

// 3rd party middleware
app.use( logger( "dev" ) );


app.use( "/api/users", router );

// fake authorisation
const fakeAuth = ( req, res, next ) => {
    const authStatus = true;
    if ( authStatus ) 
    {
        console.log( `Auth status of user is ${ authStatus }` );
        next();
    }
    else
    {
        res.status( 401 );
        throw new Error( "User is not authorised" );
        }
}

// router-level middleware
const getUsers = (req, res) => {
    res.json( { "message": "Getting all the users" } );
}
const createUser = ( req, res ) => {
    console.log("This is the request body recieved from client : ", req.body)
    res.json( { "message": "Creating user will id: 0201IT201020" } );
}

router.use( fakeAuth ); // this is done for fake auth routing
router.route( "/" ).get( getUsers ).post( createUser );

// error handler middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500; // 500 means internal sever error
    res.status( statusCode );
    if ( statusCode === 401 )
    {
        res.json( {
            "title": "Unauthorised user",
            "message" : err.message
        })
    }
    else if ( statusCode === 404 )
    {
        res.json( {
            "title": "Not found",
            "message" : err.message
        })
    }
    if ( statusCode === 500 )
    {
        res.json( {
            "title": "Server error",
            "message" : err.message
        })
    }
    
}
app.use( errorHandler );

app.all( "*", (req, res, next) => {
    res.status( 400 );
    throw new Error( "Route not found" );
} )

app.post( "/upload", upload.single( "image" ), ( req, res, next ) => {
    console.log( req.file, req.body );
    res.send( req.file );
}, ( err, req, res ) => {
    res.status(400).send({"err": err.message})
});

// router level middleware ends
app.listen( 8000, () => {
    console.log( `Your port is listening at ${ port }` );
})