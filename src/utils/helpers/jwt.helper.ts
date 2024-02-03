import jwt, { JwtPayload } from 'jsonwebtoken';
// import logger from '../../services/logger.service';

/**
 *
 * @param payload the data to be encoded in the token
 * @param expiresIn the time the token will expire
 * @returns
 */
export const generateJwtToken = (
    payload: any,
    expiresIn: string
): string | boolean => {
    try {
        return jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn });
    } catch (err) {
        // logger.error(err);
        console.log(err);
        return false;
    }
};

/**
 * Verify if token is valid and not expired
 * @param token the authentication token
 * @returns boolean | object
 */
export const verifyJwtToken = (
    token: string
): string | boolean | JwtPayload => {
    try {
        return jwt.verify(token, String(process.env.JWT_SECRET));
    } catch (err) {
        console.log(err);
        // logger.error(err);
        return false;
    }
};
