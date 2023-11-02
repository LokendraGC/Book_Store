import React, { useEffect, useState } from "react";
import api from "../api/config";
import {FaTrashAlt} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';


const ListBook = () => {
  const [bookList, setbookList] = useState([]);

  useEffect(() => {
    async function getBook() {
      const response = await api.get("/book");
      setbookList(response.data);
    }
    getBook();
  }, []);

  const deleteBook = async(id,idx)=>{
    const data = window.confirm("Do you want to delete book?")
    if(data){
        try{
        const response =await api.delete(`/book/delete/${id}`)
        console.log(response);
       if(response.data.success){

        const newBookList = bookList.filter((book,index)=>index!==idx);
        setbookList(newBookList);

        console.log("Book is deleted")
        toast.success("Book is deleted");
       }else{
        console.log("Unable to delete book")
        toast.error("Unable to delete book");
       }
    }
       catch(err){
        toast.error(err.message)
       }
    }
  }
  return (
    <center style={{ marginTop: "50px" }}>
      <ToastContainer />
      {bookList.length > 0
        ? bookList.map((book, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  boxShadow: "0px 0px 5px #ccc",
                  margin: "10px",
                  padding: "8px",
                  color: "blue",
                  width: "45%",
                  textAlign: "start",
                  fontWeight: "600",
                }}
              >
                {book.name}
                <FaTrashAlt
                  onClick={() => deleteBook(book.id, index)}
                  style={{ color: "black", cursor: "pointer" }}
                />
              </div>
            );
          })
        : "No Books avilable"}
    </center>
  );
};

export default ListBook;
