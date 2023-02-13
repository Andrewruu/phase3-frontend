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

    function handleAddBook(newBook) {
        setBooks([...books, newBook]);
        console.log(newBook)
        console.log(books)
    }

    function handelRemoveBook(removeBook){
        setBooks(books.filter(book => book.id !== removeBook.id))
    }

    function handleAddReview(reviews, newReview) {
        const bookToUpdate = books.find(book => book.id === newReview.book_id)
        const newReviews = [...reviews, newReview]
        setBooks(books.map(book => {
            if(book === bookToUpdate){ 
                return{
                    ...bookToUpdate,
                    reviews: newReviews
                }
}
            else
                return book
            
            }))
        
    }
    function handelRemoverReview(removeReview){
        const bookToUpdate = books.find(book => book.id === removeReview.book_id)
        const bookUpdated = books.map(book=>
        {
            if(book === bookToUpdate)
            {
                return{
                    ...bookToUpdate,
                    reviews: book.reviews.filter(review => review.id !== removeReview.id)
                }
            }
            else 
                return book
        })
        setBooks(bookUpdated)
        
    }

    function handleEditReview(editReview){
        const bookToUpdate = books.find(book => book.id === editReview.book_id)
        setBooks(books.map(book => {
            if(book === bookToUpdate){ 

                return{
                    ...bookToUpdate,
                    reviews: book.reviews.map(review => review.id !== editReview.id ? review: editReview)
                }
            }
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