'use strict';

var KOA = require( 'koa' );
var body = require( 'koa-better-body' );
var router = require( 'koa-better-router' )().loadMethods();

var app = new KOA();

router.get( '/list', function * ( next ) {
    this.body = 'list';
} );

router.post( '/upload', body(), function * ( next ) {

    console.log( this.request.files );
    console.log( this.request.fields );
    console.log( this.request.body );

    this.body = JSON.stringify( {
        fields: this.request.fields
        , files: this.request.files
        , body: this.request.body || null
    }, null, 2 );

    yield next;

} );

app.use( router.middleware() );
app.listen( 4292 );
console.log( 'listening on 4292 ...' );
