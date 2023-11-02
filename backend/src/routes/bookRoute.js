import { Router } from "express";
import multer from "multer";
import BookController from "../controllers/bookController.js";

const router = Router();

let imageName;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for each uploaded file
    imageName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname.trim();
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });

// Handle the file upload and add data to the database

const bookController = new BookController;

// CREATE
router.post("/add", upload.single("image"),(req,res)=>{
  bookController.addBook(req,res,imageName);
});

//READ
router.get("/:id", bookController.getBookById);

// Get ALL Books

router.get("/",bookController.getBooks);

// UPDATE
router.put("/update/:id",bookController.updateBook)

// DELETE
router.delete("/delete/:id", bookController.deleteBook);

// SEARCH  /search/all/?q=
router.get("/search/all", bookController.searchBook);



export default router;
