import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Routs for save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publisheYear) {
      return res.status(400).send({ message: "Give all the details." });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publisheYear: req.body.publisheYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
// Route to get all the books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
// Route to get one book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Route to update a book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // if (!req.body.title || !req.body.author || !req.body.publisheYear) {
    //   return res.status(400).send({ message: "Give all the details." });
    // }
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).send({ message: "book not found" });
    }
    return res.status(200).send({ message: "Book details updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
// Route to delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id).deleteOne();

    if (!book) {
      res.status(404).send({ message: "Book not found" });
    } else {
      return res.status(200).send({ message: "Book deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
