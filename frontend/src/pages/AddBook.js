import React, { useState } from "react";
import "../assets/sass/form.scss";
import api from "../api/config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
  const [formData, setformData] = useState({});
  const [imageData, setImageData] = useState();

  const handleChange = (e) => {
    console.log(e.target.value);
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
    const  res = await api.post(
        "/book/add",
        {
          ...formData,
          image: imageData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.id) {
        e.target.reset();
        setformData({});
        setImageData();
        console.log(res);
        console.log("success");
        toast.success("Book is added")
      } else {
        console.log(res.data.message);
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ToastContainer />

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "30px 40px",
        }}
        onSubmit={handleSubmit}
      >
        Name
        <input
          type="text"
          name="name"
          placeholder="Name of book"
          onChange={handleChange}
        />
        Author
        <input
          type="text"
          name="author"
          placeholder="Name of author"
          onChange={handleChange}
        />
        Genre
        <input
          type="text"
          name="genre"
          placeholder="type of book"
          onChange={handleChange}
        />
        Description
        <textarea
          name="description"
          placeholder="Give Description about the book"
          rows={10}
          onChange={handleChange}
        ></textarea>
        <input
          id="img"
          type="file"
          name="image"
          onChange={(e) => setImageData(e.target.files[0])}
        />
        <input id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddBook;
