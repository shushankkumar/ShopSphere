const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const { fetchAdmin, ADMIN_JWT_SECRET } = require("../middleware/adminAuth");

const router = express.Router();

const buildAdminToken = (admin) => {
    return jwt.sign(
        {
            admin: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
            },
        },
        ADMIN_JWT_SECRET
    );
};

router.get("/status", async (req, res) => {
    const count = await Admin.countDocuments();
    res.json({ success: true, hasAdmins: count > 0 });
});

router.post("/create", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, error: "Name, email, and password are required" });
    }

    const adminCount = await Admin.countDocuments();

    if (adminCount > 0) {
        const token = req.header("admin-auth-token");

        if (!token) {
            return res.status(401).json({ success: false, error: "Admin authentication required" });
        }

        try {
            jwt.verify(token, ADMIN_JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ success: false, error: "Invalid admin token" });
        }
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
        return res.status(400).json({ success: false, error: "Admin already exists with this email" });
    }

    const admin = await Admin.create({ name, email, password });
    const response = {
        success: true,
        admin: {
            id: admin.id,
            name: admin.name,
            email: admin.email,
        },
    };

    if (adminCount === 0) {
        response.token = buildAdminToken(admin);
    }

    return res.json(response);
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
        return res.status(404).json({ success: false, error: "Admin not found" });
    }

    if (admin.password !== password) {
        return res.status(400).json({ success: false, error: "Wrong password" });
    }

    return res.json({
        success: true,
        token: buildAdminToken(admin),
        admin: {
            id: admin.id,
            name: admin.name,
            email: admin.email,
        },
    });
});

router.get("/me", fetchAdmin, async (req, res) => {
    const admin = await Admin.findById(req.admin.id).select("name email");

    if (!admin) {
        return res.status(404).json({ success: false, error: "Admin not found" });
    }

    return res.json({ success: true, admin });
});

router.get("/list", fetchAdmin, async (req, res) => {
    const admins = await Admin.find({}).select("name email createdAt").sort({ createdAt: -1 });
    res.json({ success: true, admins });
});

router.post("/remove", fetchAdmin, async (req, res) => {
    const { adminId } = req.body;

    if (!adminId) {
        return res.status(400).json({ success: false, error: "Admin id is required" });
    }

    if (String(req.admin.id) === String(adminId)) {
        return res.status(400).json({ success: false, error: "You cannot remove your own admin account" });
    }

    const count = await Admin.countDocuments();
    if (count <= 1) {
        return res.status(400).json({ success: false, error: "At least one admin must remain" });
    }

    await Admin.findByIdAndDelete(adminId);
    return res.json({ success: true });
});

module.exports = router;
