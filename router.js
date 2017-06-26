'use strict';
var body = require( 'koa-better-body' );
var router = require( 'koa-better-router' )().loadMethods();

router.get( '/list', function * ( next ) {
    this.body = 'list';
    yield next;
} );

router.post( '/error-log', body(), function * ( next ) {
    let info;

    try {
        info = JSON.parse( this.request.body );
    }
    catch ( e ) {
        console.log( 'JSON.parse error ...' );
    }

    if ( info ) {
        yield this.mongo.db( 'sophon-error' )
            .collection( 'error-log' )
            .insert( info)
            ; 
        this.body = 'log success';
    }
    else {
        this.body = 'log failed';
    }

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

module.exports = router;
