import { validationResult } from 'express-validator'

const validateInputFields = (req, res, next ) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.mapped())
    }

    next();

}

export {validateInputFields}
