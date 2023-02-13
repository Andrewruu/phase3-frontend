import React, {useState} from "react";


export default function AddReview({handleAddReview, bookID, reviews}) {

    const [reviewObj, setReviewObj]= useState({
        name: "",
        comment: "",
        score: "",
        book_id: bookID

    })

    function clearForm(){
        const clearReviewObj = {
            name: "",
            comment: "",
            score: "",
            book_id: bookID
        }
        setReviewObj(clearReviewObj)
    }
    function handleChange(e) {
        setReviewObj({
          ...reviewObj,
          [e.target.name]: e.target.value,
        })
      }
    
    function handelSubmit(e){
        e.preventDefault()
        const newReview ={
            name: reviewObj.name,
            comment: reviewObj.comment,
            score: reviewObj.score,
            book_id: reviewObj.book_id
        }
  
        fetch("http://localhost:9292/reviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
          })
            .then((r) => r.json())
            .then(data => {
                handleAddReview(reviews, data)
                clearForm()
            })
    }


    return (
        <div className="add-review-form">
            <h1>Add Review</h1>
            <form onSubmit={handelSubmit}>
            <p>Name </p>
                <input
                type="text"
                name="name"
                label="name"
                value={reviewObj.name}
                onChange={handleChange}/>
            <p>Comment </p>
                <input
                type="text"
                name="comment"
                label="comment"
                value={reviewObj.comment}
                onChange={handleChange}/>
            <p>score </p>
            <input
                type="number"
                name="score"
                label="score"
                value={reviewObj.score}
                onChange={handleChange}/>
            
            <br/>
            <button type="submit">submit</button>

            </form>
        </div>
    )
}