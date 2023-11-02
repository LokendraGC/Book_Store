import React, { useEffect, useState } from "react";
import api from "../api/config.js";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tempBookList, settempBookList] = useState([]);

  useEffect(() => {
    async function fetchBook() {
      const response = await api.get("/book");
      setBookList(response.data);
      settempBookList(response.data);
    }
    fetchBook();
  }, []);

  useEffect(() => {
    async function searchBook() {
      const response = await api.get(`/book/search/all?q=${searchText}`);
      if (response.data) {
        console.log(response.data);
        setBookList(response.data);
      }
    }
    if (searchText) searchBook();
    else setBookList(tempBookList);
  }, [searchText, tempBookList]);

  return (
    <>
      <center>
        <input
          type="text"
          placeholder="Search Books"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: "60%", marginTop: "20px", borderRadius: "3px" }}
        />
      </center>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        {bookList.length > 0
          ? bookList.map((book, index) => {
              return (
                <div
                  onClick={() => navigate("/explore" ,{
                    state:{
                      book,
                    },
                  })}
             
                  key={index}
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

                  {book.name}
                </div>
              );
            })
          : "No Books Found"}
      </div>
    </>
  );
};

export default HomePage;
