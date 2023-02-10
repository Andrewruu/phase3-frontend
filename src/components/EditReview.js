import React, {useState} from "react";


export default function EditReview({review, handleEditReview, handleEdit}) {

    const [reviewObj, setReviewObj]= useState({
        name: review.name,
        comment: review.comment,
        score: review.score,
        book_id: review.book_id

    })

    function handleChange(e) {
        setReviewObj({
          ...reviewObj,
          [e.target.name]: e.target.value,
        })
      }
    
    function handelSubmit(e){
        e.preventDefault()
        const editReview ={
            name: reviewObj.name,
            comment: reviewObj.comment,
            score: reviewObj.score,
            book_id: reviewObj.book_id
        }
        fetch(`http://localhost:9292/reviews/${review.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(editReview),
          })
            .then((r) => r.json())
            .then(data => {
                handleEditReview(data)
                handleEdit()
            })
        
    }


    return (
        <div className="add-review-form">
            <h1>Edit Review</h1>
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