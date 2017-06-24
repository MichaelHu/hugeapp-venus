'use strict';

var KOA = require( 'koa' );
var body = require( 'koa-better-body' );
var router = require( 'koa-better-router' )().loadMethods();
var cors = require( 'kcors' );
var mongo = require( 'koa-mongo' );

var app = new KOA();
var port = 8222;

router.get( '/list', function * ( next ) {
    this.body = 'list';
    yield next;
} );

router.post( '/error-log', body(), function * ( next ) {
    if ( this.request.fields ) {
        yield this.mongo.db( 'venus' )
            .collection( 'error-log' )
            .insert( this.request.fields )
            ; 
    }

    this.body = 'log success';
    yield next;
} );


router.post( '/upload', body(), function * ( next ) {

    console.log( this.request.files );
    console.log( this.request.fields );
    console.log( this.request.body );

    if ( this.request.fields ) {
        yield this.mongo.db( 'venus' )
            .collection( 'error-log' )
            .insert( this.request.fields )
            ; 
    }

    this.body = JSON.stringify( {
        fields: this.request.fields
        , files: this.request.files
        , body: this.request.body || null
    }, null, 4 );

    yield next;

} );

app.use( cors() );
app.use( mongo( {
    host: '127.0.0.1'
    , port: 27017
    , db: 'venus'
    , user: 'hudamin'
    , pass: 'test'
} ) );
app.use( router.middleware() );
app.listen( port, () => { 
    console.log( 'listening on ' + port + ' ...' );
} );
