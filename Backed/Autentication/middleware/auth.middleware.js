import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        else if (req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                message: "Authentication token missing",
            });
        }

        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};
