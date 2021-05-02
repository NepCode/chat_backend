

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {

        this.io.on('connection', ( socket ) => {

            console.log('Client connected');


            socket.emit( 'channel' , 'hello' );

        });
    }


}


export default Sockets;