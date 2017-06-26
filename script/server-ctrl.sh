#!/bin/bash


file_server_pid='server-pid'
option=$1

function chk_version {
    major=`node -v | awk -F. '{print $1}' | sed -e 's/v//g'`
    if (( $major < 8 )); then
        echo "Error: require node version >= 8.0.0!"
        exit 1
    else
        echo "Info: correct node version"
    fi
}

function chk_dir {
    dir=`pwd | grep '/script'`
    has_file=`ls | grep 'server-ctrl.sh' | wc -l`
    if [ "$dir" != "" ]; then
        if (( $has_file > 0 )); then 
            echo "Info: correct running directory"
        else
            echo "Error: the script must be runned under 'script' directory"
            exit 1
        fi
    else
        echo "Error: the script must be runned under 'script' directory"
        exit 1
    fi
}


function start_server {
    nohup env node ../index.js &
    echo "$!" > $file_server_pid
}

function stop_server {
    if [ -e $file_server_pid ]; then 
        kill `cat $file_server_pid`
        rm $file_server_pid
        echo "Info: Stop server successfully!"
    fi
}

chk_version
chk_dir
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
