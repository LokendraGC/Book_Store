import React from "react";
import { useLocation } from "react-router-dom";

const Explore = () => {
  const book = useLocation().state.book;
  console.log(book);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <img
        src={book.image}
        alt="Book"
        style={{
          height: "240px",
          width: "200px",
          objectFit: "contain",
          boxShadow: "0px 0px 9px #ccc",
          marginLeft: "15px",
        }}
      />
      <div style={{ fontWeight: 400 }}>
        <p>
          <b>Book:</b>
          {book.name}{" "}
        </p>
        <p>
          <b>Author:</b>
          {book.author}
        </p>
        <p>
          <b>Genre:</b>
          {book.genre}{" "}
        </p>
        <p>
          <b>Description:</b>
          {book.description}
        </p>
      </div>
    </div>
  );
};

export default Explore;
