import React from "react";
import BookCard from "./BookCard";


function BookList({books, handelRemoveBook}){
    const booksList = (
        <div id="book-collection">{
            books.map((book)=>{
             return <BookCard key={book.id} book={book} handelRemoveBook={handelRemoveBook}/>
            })
          }</div>
      )


    return(
        <div>
            <h1>Books</h1>
            {booksList}
        </div>
    )
}

export default BookList