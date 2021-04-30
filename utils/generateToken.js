import jwt from 'jsonwebtoken'

const generateToken = (id) => {

  /* return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  }) */
  
  return new Promise(  ( resolve, reject ) => {

    const payload = { id };

    jwt.sign( payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
      }, ( err, token ) => {
        if ( err ) {
            console.log(err);
            reject('there was an error generating JWT');
        } else {
            resolve( token );
        }
      });

    });
}

export default generateToken