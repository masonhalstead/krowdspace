const { OAuth2Client } = require('google-auth-library');
const generator = require('generate-password');
const { GOOGLE_CLIENT_ID } = process.env;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const password = generator.generate({length: 10, numbers: true});

module.exports = async function(req, res, next) {
    const { token } = req.body;

    if (!token) return res.status(401).send("Access denied, No token provided");

    try {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    req.body = {
        email: payload.email,
        name: payload.name,
        sub: payload.sub,
        password: `${password}!`
    }
    next();
    } catch (ex) {
        res.status(400).send("Invalid token");
    }
};
