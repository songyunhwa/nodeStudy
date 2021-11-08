const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/key').secretKey;
const options = require('../config/key').options;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    sign: async (user) => {
        /* 현재는 idx와 email을 payload로 넣었지만 필요한 값을 넣으면 됨! */
        const payload = {
            id: user.id,
            email: user.email,
        };
        const result = {
            //sign메소드를 통해 access token 발급!
            token: jwt.sign(payload, secretKey, options),
            refreshToken: randToken.uid(256)
        };
        return result;
    },
    verify: async (token) => {
        let decoded;
        try {
            // verify를 통해 값 decode!
            decoded = jwt.verify(token, secretKey);
        } catch (err) {
            if (err.message === 'jwt expired') {
                return 'expired token';
            } else if (err.message === 'invalid token') {
                return 'invalid token';
            } else {
                console.log("invalid token");
                return 'invalid token';
            }
        }
        return decoded;
    }
}