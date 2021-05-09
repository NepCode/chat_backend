import { userConnected, userDisconnected, getUsers } from '../controllers/socketController.js';
import { checkJWT } from '../middleware/authMiddleware.js'

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {

        this.io.on('connection', async ( socket ) => {

            // TODO: socket join, id 
            // TODO: listen when user sends a message , private message 
            // TODO: disconnect user and update in db 
            // TODO: emit all connected users
            
            // TODO: validate JWT if not valid disconnect client 
            const [ isValid, id ] = checkJWT( socket.handshake.query['Authorization']  );
            if ( !isValid ) {
                console.log('unknown socket');
                return socket.disconnect();
            }
            
            
            // TODO: check online status through id 
            console.log('Client connected', id);
            await userConnected(id);
            
            socket.on('disconnect', async  () => {
                console.log('client disconnected', id)
                await userDisconnected(id);
                this.io.emit( 'users-list', await getUsers() )
            })
            
            
            // TODO: emit every single connected user 
            this.io.emit( 'users-list', await getUsers() )



            socket.emit( 'channel' , 'hello' );

        });
    }


}


export default Sockets;