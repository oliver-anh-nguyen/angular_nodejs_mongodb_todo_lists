const jwt = require("jsonwebtoken");
module.exports = function checkToken(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).send({auth: false, message: 'No token provided.'});
    }
    jwt.verify(token, "SECRET" , function (err, decoded) {
       if (err) {
           return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
       }
       req.user = decoded;
       next();
    });
}