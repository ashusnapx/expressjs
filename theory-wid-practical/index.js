/* 
Types of middlewares - 
1. Application-level middleware
2. 3rd party middleware
3. Router-level middleware
4. Built-in middleware
5. Error-handling middleware
*/

const express = require( 'express' );
const app = express();
const port = 8000;

const loggerMiddleware = (req, res, next) => {
    console.log( `${ new Date() } --- Request [${ req.method }] [${ req.url }]` );
    next();
}
app.use( loggerMiddleware );
app.listen( 8000, () => {
    console.log( `Your port is listening at ${ port }` );
})