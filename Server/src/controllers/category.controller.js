const Category= require("../models/Category")
const slugify = require("../utils/slugify")

const createCategory = async(req, res) => {
    try{
        const{ name, description } = req.body;

        if (!name || typeof name !== "string" || !name.trimEnd()) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            })
        }

        const slug = slugify(name);
        if (!slug) {
            return res.status(400).json({
                success: false,
                message: "Category name must contain letters or numbers",
            });
        }

        const exists = await Category.findOne({ slug });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Category already exists",
            });
        }

        const category = await Category.create({
            name: name.trim(),
            slug,
            description,
        });

        res.status(201).json({
            success: true,
            message: "Category created",
            data: category,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Category already exists",
            });
        }
        if (error.name === "ValidationError") {
            const message = Object.values(error.errors)[0].message;
            return res.status(400).json({ success: false, message });
        }
        console.error("Create Category Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    
    }
}