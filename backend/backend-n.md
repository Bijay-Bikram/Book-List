## 1. Project Structure
```
backend
    - models
    - routes
    - config.js
    - index.js
    - package.json
    - package-lock.json

frontend
.gitignore
README.md
```

## 2. Network Status in Browser
```
Dev Tool from browser
    - Network tab
        - Click on URL

```

## 3. Middleware for parsing request body
Note: This middleware is required to parse request body in express-js while using post request
```
app.use(express.json());
```

## 4. Route to Create new book and save it in database
Create a new document using the create() method. <br>

index.js
```
app.post('/books', async (req, res) => { // Create new book
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            res.status(400).send({ message: "Please fill all the fields" });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})
```

## 5. Route to Get all books from database
Find all documents using the find() method. <br>

index.js
```
app.get('/books', async (req, res) => { // Get all books from database
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})
```

## 6.Route to Get single book from database by id
Find a document using the findById() method.<br>

index.js
```
app.get('/books/:id', async (req, res) => { // Get single books from database using id
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})
```

## 7.Route to update books using id 
Find and update a document using the findOneAndUpdate() method.<br>

index.js
```
app.put('/books/:id', async (req, res) => { // Route to update books using id
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            res.status(400).send({ message: "Please fill all the fields" });
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).send({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book updated successfully" });
    }

    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})
```

## 8. Route to delete books using id
Find and delete a document using the findByIdAndDelete() method. <br>

index.js
```
app.delete('/books/:id', async (req, res) => { // Route to delete books using id
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book deleted successfully" });
    }

    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})
```

## 9. Refactor Nodejs & Express Router
`Refactor is the way to restructure and simplify code.` <br>
Create 'routes/booksRoute.js' in backend folder and move all routes from 'index.js' to it. <br>
Then import routes/booksRoute.js in index.js and use it. <br>

routes/booksRoute.js
```
import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();



router.post('/', async (req, res) => { // Create new book
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            res.status(400).send({ message: "Please fill all the fields" });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

router.get('/', async (req, res) => { // Get all books from database
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

router.get('/:id', async (req, res) => { // Get single books from database using id
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

router.put('/:id', async (req, res) => { // Route to update books using id
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            res.status(400).send({ message: "Please fill all the fields" });
        }

        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).send({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book updated successfully" });
    }

    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

router.delete('/:id', async (req, res) => { // Route to delete books using id
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book deleted successfully" });
    }

    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})


export default router;
```

index.js
```
import booksRoute from "./routes/booksRoute.js";

//code...

app.use('/books', booksRoute);

```

## 10. CORS Policy in Nodejs and Expressjs <mark>Important</mark>
It is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.<br>

Install cors npm: `npm install cors` <br>

There are 2 ways to set CORS policy : <br>
1. Allow All Origin with Default of cors(*) <br>
index.js
```
app.use(cors());
```
2. Allow Custom Origins <br>
index.js
```
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))
```
``Note: Custom origns is more secure and effective since it allows for specific domains to access.``<br>







