import { Link } from "react-router-dom";

export default function BookCard({book,handelRemoveBook}){
    const {id, title, image, author} = book

    function handleRemove(){
        fetch(`http://localhost:9292/books/${id}`,{
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(()=>handelRemoveBook(book))
    }


    return(
        <div className="card">
            
            <h2>{title}</h2>
            <img
            src={image}
            alt={title}
            className="book-avatar"
            />
            <h3>{author}</h3>
            <Link to={`/Books/${id}`}>More Details</Link>
            <button onClick={handleRemove}>Remove</button>

        </div>
    )
}