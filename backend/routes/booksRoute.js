import express from "express";
import bookModel from "../models/bookModel.js";

const router = express.Router();

router.post('/', async (req, res) => { // List new Book
    try {
        const { title, author, publishYear, description } = req.body;
        const newBook = await bookModel.create({
            title: title,
            author: author,
            publishYear: publishYear,
            description: description
        });
        res.send(newBook);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: error.message });
    }
})

router.get('/', async (req, res) => { // Get all Books list
    try {
        const books = await bookModel.find();
        res.json({
            total: books.length,
            books: books
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
})

router.get('/:id', async (req, res) => { // Get Single Book list
    try {
        const { id } = req.params;
        const book = await bookModel.findById(id);
        res.send(book);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
})

router.put('/:id', async (req, res) => { // Update Book list
    try {
        const { id } = req.params;
        const { title, author, publishYear, description } = req.body;
        const result = await bookModel.findByIdAndUpdate(id, {
            title: title,
            author: author,
            publishYear: publishYear,
            description: description
        });
        if (!result) {
            return res.status(404).send({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book updated successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
})

router.delete('/:id', async (req, res) => { // Delete Book list
    try {
        const { id } = req.params;
        const result = await bookModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book deleted successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
})

export default router