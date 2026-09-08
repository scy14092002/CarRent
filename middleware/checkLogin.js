const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            msg: "Authorization failed"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            msg: "Invalid or expired token"
        });
    }
};


module.exports = checkLogin;