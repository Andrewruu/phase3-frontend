import ReviewCard from "./ReviewCard"
export default function Review({bookreview, handelRemoverReview, handleEditReview}){
    const reviewList = (
        <div id="review-collection">{
            bookreview.map((review)=>{
            return <ReviewCard key={review.id} review={review} handelRemoverReview={handelRemoverReview} handleEditReview={handleEditReview}/>
            })
          }</div>
      )
    return(
        <div>
            <h3>Reviews</h3>
            {reviewList}
        </div>
    )
}