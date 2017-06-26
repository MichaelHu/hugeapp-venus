'use strict';

var KOA = require( 'koa' );
var cors = require( 'kcors' );
var mongo = require( 'koa-mongo' );
var config = require( './config' );
var router = require( './router' );

var app = new KOA();
var port = config.port;

app.use( cors() )
    .use( mongo( config.database ) )
    .use( router.middleware() )
    ;

app.listen( port, () => { 
    console.log( 'listening on ' + port + ' ...' );
} );
