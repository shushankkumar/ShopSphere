const jwt = require("jsonwebtoken");

const ADMIN_JWT_SECRET = "secret_admin_ecom";

const fetchAdmin = async (req, res, next) => {
    const token = req.header("admin-auth-token");

    if (!token) {
        return res.status(401).json({ success: false, error: "Admin authentication required" });
    }

    try {
        const data = jwt.verify(token, ADMIN_JWT_SECRET);
        req.admin = data.admin;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, error: "Invalid admin token" });
    }
};

module.exports = { fetchAdmin, ADMIN_JWT_SECRET };
