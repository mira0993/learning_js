#!/bin/bash

if [ ! $DB_LOC ]; then
	export DB_LOC=mongodb://127.0.0.1:27017/onsitedb
fi
if [ ! $SERVER_LOC ]; then
	export SERVER_LOC=`ifconfig en0|grep -i "inet "|cut -d" " -f 2`
fi
if [ ! $PORT ]; then
	export PORT=8080
fi

SERVER_SCRIPT='server.js'
START_DEV=0
START_PROD=0

usage(){
	echo "-p  | --port	 Server port."
	echo "-db | --db_url	 Database location."
	echo "-s  | --server	 Server IP/hostname."
	echo "-h  | --help	 Display this message."
	echo ""
	echo " --start-dev       Start development server (nodemon/webpack-watch)."
	echo "--start-prod       Start server."

}

while [ "$1" != "" ]; do
    case $1 in
        -p | --port )           shift
                                export PORT=$1
                                ;;
        -db | --db_url )    	shift
				export DB_LOC=$1
                                ;;
        -s | --server )         shift
                                export SERVER_LOC=$1
                                ;;
	-h | --help )		usage
				exit 0
				;;
	--start-dev )		START_DEV=1
				;;
	--start-prod )		START_PROD=1
				;;
        * )                     usage
                                exit 1
    esac
    shift
done

echo "Settings"
echo "-----------------------"
echo "* Port:   $PORT"
echo "* Server: $SERVER_LOC"
echo "* DB Loc: $DB_LOC"


server_path="`dirname $0`/$SERVER_SCRIPT";
if [ $START_PROD -eq 1 ]; then
	echo "Starting nodejs/express server in $server_path"
	node $server_path
elif [ $START_DEV -eq 1 ]; then
	echo "Starting development server in $server_path"
	cd `dirname $0`;npm run dev
else
	echo "-----------------------"
fi
