const express = require("express");

const router = express.Router();

const Product = require("../models/Product");


// ADD PRODUCT
router.post("/add", async (req, res) => {

    try {

        const product = new Product(req.body);

        await product.save();

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json(error);
    }
});


// GET PRODUCTS
router.get("/", async (req, res) => {

    try {

        const products = await Product.find();

        res.json(products);

    } catch (error) {

        res.status(500).json(error);
    }
});


// UPDATE PRODUCT
router.put("/:id", async (req, res) => {

    try {

        const updatedProduct =
            await Product.findByIdAndUpdate(

                req.params.id,
                req.body,
                { new: true }

            );

        res.json(updatedProduct);

    } catch (error) {

        res.status(500).json(error);
    }
});


// DELETE PRODUCT
router.delete("/:id", async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json(error);
    }
});

module.exports = router;