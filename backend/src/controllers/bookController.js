import { Op } from "sequelize";
import bookModel from "../models/bookModel.js";
import bookConstant from "../constants/bookConstant.js";
import urlConstant from "../constants/urlConstant.js";


export default class BookController {
  //CREATE
  async addBook(req, res, imageName) {
    try {
      // Use req.file to access the uploaded file details
      const image = req.file; // This contains information about the uploaded image

      // if (!image) {
      //   return res
      //     .status(400)
      //     .json({ success: false, message: "Image is missing." });
      // }

      const data = await bookModel.create({
        name: req.body.name,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        image: imageName, // Use the generated image name
      });

      if (data) {
        res.json(data);
      } else {
        res
          .status(400)
          .json({ success: false, message: "Book can not be added" });
      }
    } catch (error) {
      console.error(error);
      return res.json({ success: false, message: "Error while quering in database" });
    }
  }

  //READ
  async getBookById(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await bookModel.findByPk(id);
      data ? res.json(data) : res.json([]);
    } else {
      res.json({ success: false, message: bookConstant.BOOK_CONSTANT });
    }
  }

  // UPDATE
  async updateBook(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await bookModel.update(req.body, {
        where: {
          id,
        },
      });
      if (data[0]) {
        res.json({ success: true, message: "Book is Updated" });
      } else {
        res.json({ success: false, message: "Book could't update" });
      }
    } else {
      res.json({ success: false, message: bookConstant.BOOK_CONSTANT });
    }
  }

  // DELETE
  async deleteBook(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await bookModel.destroy({
        where: {
          id,
        },
      });
      if (data === 1) {
        res.json({ success: true, message: "Book is deleted" });
      } else {
        res.json({ success: false, message: "Book could't delete" });
      }
    } else {
      res.json({ success: false, message:bookConstant.BOOK_CONSTANT});
    }
  }

  // SEARCH
  async searchBook(req, res) {
    const { q } = req.query;
    if (q) {
      const data = await bookModel.findAll({
        where: {
          [Op.or]: {
            name: {
              [Op.like]: `%${q}%`,
            },
            author: {
              [Op.like]: `%${q}%`,
            },
          },
        },
        raw:true,
      });
      console.log(data);

      for(let d of data){
      d.image = urlConstant.IMG_URL + d.image;
      console.log(d.image);
    }
      res.json(data);
    } else {
      res.json({ success: false, message: "Empty query search string" });
    }
  }

  // GET ALL Book
 async getBooks(req,res){
    let {limit} = req.query;
    if(!limit) limit = 20;

    try{
      
  const data = await bookModel.findAll({
      limit:parseInt(limit),
      raw:true,

    });

    for(let d of data){
      d.image = urlConstant.IMG_URL + d.image;
      console.log(d.image);
    }

    res.json(data)
  }catch(err){
    res.json({success:false,message:err})
  }
  }
}
