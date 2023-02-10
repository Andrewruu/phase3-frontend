import React, {useState} from "react";
import { useHistory } from "react-router-dom";

export default function AddBook({handleAddBook}) {
    const history = useHistory()

    const [bookObj, setBookObj]= useState({
        title: "",
        image: "",
        author: "",
        summary: ""

    })

    function handleChange(e) {
        setBookObj({
          ...bookObj,
          [e.target.name]: e.target.value,
        })
      }
    
    function handelSubmit(e){
        e.preventDefault()
        const newBook ={
            title: bookObj.title,
            image: bookObj.image,
            author: bookObj.author,
            summary: bookObj.summary
        }
        fetch("http://localhost:9292/books", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
          })
            .then((r) => r.json())
            .then(data => {handleAddBook(data)
                history.push("/Books")})
    }


    return (
        <div className="add-book-form">
            <h1>Add Books</h1>
            <form onSubmit={handelSubmit}>
            <p>Title </p>
                <input
                type="text"
                name="title"
                label="title"
                value={bookObj.title}
                onChange={handleChange}/>
            <p>Image </p>
                <input
                type="text"
                name="image"
                label="image"
                value={bookObj.image}
                onChange={handleChange}/>
            <p>Author </p>
            <input
                type="text"
                name="author"
                label="author"
                value={bookObj.author}
                onChange={handleChange}/>
            <p>Summary</p>
            <textarea
                name="summary"
                label="summary"
                value={bookObj.summary}
                onChange={handleChange}
            />
            <br/>
            <button type="submit">submit</button>

            </form>
        </div>
    )
}