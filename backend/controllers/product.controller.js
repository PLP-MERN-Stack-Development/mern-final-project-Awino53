
import Product from '../models/product.model.js';
import mongoose from "mongoose";


export const getProducts =  async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in fetching products" });
    }
}

export const createProduct =  async (req, res) => {
     
  const product = req.body;//user will send product data in request body

  if (!product.name || !product.price || !product.imageUrl) {
    return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({message: "Product created successfully", product: newProduct});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "error in creating product" });
    }

      
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log("id:", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "product NOT found" });
    }
 }