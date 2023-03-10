import { useState } from "react"
import EditReview from "./EditReview"

export default function ReviewCard({review, handelRemoverReview, handleEditReview}){
    const {name, comment, score, created_at} = review
    const formatedate = new Date(created_at).toLocaleString()
    const [edit, setEdit] = useState(false)
    function handleRemove(){
        fetch(`http://localhost:9292/reviews/${review.id}`,{
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(()=>{
            handelRemoverReview(review)
        })
    }

    function handleEdit(){
      setEdit(!edit)
    }

    return(
    <div className="reviewcard">
            
        <h2>{name} {score}/10</h2>
        <p>{comment}</p>
        <button onClick={handleRemove}>delete</button>
        {edit ? <EditReview review={review} handleEditReview={handleEditReview} handleEdit={handleEdit}/>: <button onClick={handleEdit}>Edit</button>}
        <h5>Posted on: {formatedate}</h5>

    </div>
    )
}