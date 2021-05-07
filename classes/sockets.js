import { userConnected, userDisconnected } from '../controllers/socketController.js';
import { checkJWT } from '../middleware/authMiddleware.js'

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {

        this.io.on('connection', async ( socket ) => {

            const [ isValid, id ] = checkJWT( socket.handshake.query['Authorization']  );
            if ( !isValid ) {
                console.log('unknown socket');
                return socket.disconnect();
            }

            console.log('Client connected', id);
            await userConnected(id);

            socket.on('disconnect', async (id) => {
                console.log('client disconnected')
                await userDisconnected(id);
            })

            socket.emit( 'channel' , 'hello' );

        });
    }


}


export default Sockets;