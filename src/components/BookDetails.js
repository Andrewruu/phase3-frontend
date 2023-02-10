import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AddReview from "./AddReview";
import Review from "./Review";

export default function BookDetails({handleAddReview, handelRemoveBook, books, reviews, handelRemoverReview}){
    const params = useParams()
    const bookreview = reviews.filter(review => review.book_id == params.id)
    const book = books.find((book)=>book.id == params.id)
    const history = useHistory()

    if(book===null){
        return <h1> Loading...</h1>
    }
    
    function handleRemove(){
        fetch(`http://localhost:9292/books/${book.id}`,{
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(()=>{
            history.push("/Books")
            handelRemoveBook(book)
        })
    }



    return (
        <div>
            <div className="book-detail">
            <h1>{book.title}</h1>
                <img
                src={book.image}
                alt={book.title}
                className="book-detail-avatar"
                />

                <h2>Total Chapters {book.chapters}</h2>
                <br></br>
                <button onClick={handleRemove}>Remove</button>
                <h3>Summary</h3>
                <p> {book.summary} </p>
            </div>
            <AddReview handleAddReview={handleAddReview} bookID={params.id}/>
            <Review bookreview={bookreview} handelRemoverReview={handelRemoverReview}/>
        </div>
    )
}