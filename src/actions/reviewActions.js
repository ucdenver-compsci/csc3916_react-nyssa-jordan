// actions/reviewActions.js
export const submitReview = async(review, rating, movieId, username) => {

    
    return {
        type: 'SUBMIT_REVIEW',
        payload: {
            review,
            rating,
            movieId,
            username,
        },
    };
};
