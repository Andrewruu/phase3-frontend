import ReviewCard from "./ReviewCard"
export default function Review({bookreview, handelRemoverReview}){
    const reviewList = (
        <div id="review-collection">{
            bookreview.map((review)=>{
             return <ReviewCard key={review.id} review={review} handelRemoverReview={handelRemoverReview}/>
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