#!/bin/bash

MONGODIR=/Users/hudamin/tmp/mongodb-3.4.5/mongodb-osx-x86_64-3.4.5
MONGOD=$MONGODIR/bin/mongod
DBDATA=$MONGODIR/data
PORT=8345

function chk_version {
    major=`$MONGOD --version | awk '/db version/{print $3}' | awk -F. '{print $1}' | sed -e 's/v//g'`
    if (( $major != 3 )); then
        echo "Error: require mongod major version 3!"
        exit 1
    else
        echo "Info: correct node version"
    fi
}

function start_server {
    $MONGOD --auth \
        --dbpath=$DBDATA \
        --port $PORT \
        --fork --syslog
    echo "Info: Start server successfully!"
}

function stop_server {
    $MONGOD --auth \
        --dbpath=$DBDATA \
        --port $PORT \
        --fork --syslog \
        --shutdown
    echo "Info: Stop server successfully!"
}

chk_version
exit 0
case "$option" in
    "stop" )
        stop_server
        ;;

    * )
    stop_server
    echo "starting ..."
    sleep 3
    start_server
    ;;
esac
exit 0
