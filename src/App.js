import React, { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
import NavBar from "./components/NavBar"
import BookList from "./components/BookList"
import Home from "./components/Home"
import BookDetails from "./components/BookDetails"
import AddBook from "./components/AddBook"


export default function App(){
    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/books")
          .then(res => res.json())
          .then(setBooks);
      }, [])

    function updateBook(bookObj){
        setBooks(books.map(book=>(book.id === bookObj.id ? bookObj: book)))
    }
    function handleAddBook(newBook) {
        setBooks([...books, newBook]);
    }

    function handelRemoveBook(removeBook){
        setBooks(books.filter(book => book.id !== removeBook.id))
    }

    function handleAddReview(reviews, newReview) {
        const newReviews = ([...reviews, newReview])
        setBooks(books.map(book => {
            if(book.id === newReview.book_id){ 
                book.reviews = newReviews
                return book}
            else
                return book
            
            }))
        
    }
    function handelRemoverReview(removeReview){
       setBooks(books.map(book=>
        {
            if(book.id === removeReview.book_id)
            {
                book.reviews = book.reviews.filter(review => review.id !== removeReview.id)
                return book
            }
            else 
                return book
        }))
    }

    function handleEditReview(editReview){
        setBooks(books.map(book => {
            if(book.id === editReview.book_id){ 
                book.reviews = book.reviews.map(review => review.id !== editReview.id ? review: editReview)

                return book}
            else
                return book
            
            }))
    }


    return (
        <div className="app">
            <NavBar/>
            <Switch>
                <Route exact path="/Books">
                    <BookList books={books} handelRemoveBook={handelRemoveBook}/>
                </Route>
                <Route exact path="/NewBook">
                    <AddBook handleAddBook={handleAddBook}/>
                </Route>
                <Route path="/Books/:id">
                    <BookDetails handelRemoveBook={handelRemoveBook} books={books} handleAddReview={handleAddReview} handelRemoverReview={handelRemoverReview} handleEditReview={handleEditReview}/>
                </Route>
                <Route exact path="/">
                    <Home/>
                </Route>
            </Switch>
        </div>
    )
}