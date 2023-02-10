import React, { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
import NavBar from "./components/NavBar"
import BookList from "./components/BookList"
import Home from "./components/Home"
import BookDetails from "./components/BookDetails"
import AddBook from "./components/AddBook"


export default function App(){
    const [books, setBooks] = useState([])
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch("http://localhost:9292/books")
          .then(res => res.json())
          .then(setBooks);
        fetch("http://localhost:9292/reviews")
          .then(res => res.json())
          .then(setReviews);
      }, [])

    function updateBook(bookObj){
        setBooks(books.map(book=>(book.id === bookObj.id ? bookObj: book)))
    }
    function handleAddBook(newBook) {
        setBooks([...books, newBook]);
    }
    function handleAddReview(newReview) {
        setReviews([...reviews, newReview]);
    }
    function handelRemoveBook(removeBook){
        setBooks(books.filter(book => book.id !== removeBook.id))
    }
    function handelRemoverReview(removeReview){
        setReviews(reviews.filter(review => review.id !== removeReview.id))
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
                    <BookDetails handelRemoveBook={handelRemoveBook} books={books} reviews={reviews} handleAddReview={handleAddReview} handelRemoverReview={handelRemoverReview}/>
                </Route>
                <Route exact path="/">
                    <Home/>
                </Route>
            </Switch>
        </div>
    )
}