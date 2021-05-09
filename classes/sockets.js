import { userConnected, userDisconnected, getUsers } from '../controllers/socketController.js';
import { checkJWT } from '../middleware/authMiddleware.js'

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {

        this.io.on('connection', async ( socket ) => {

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


            // TODO: socket join, id 
            socket.join(id);
            

            // TODO: listen when some user sends a message , private message 
            socket.on('private-message', ( payload ) => {
                console.log(payload)
            })


            // TODO: disconnect user and update status in db 
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