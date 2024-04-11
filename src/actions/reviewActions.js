// actions/reviewActions.js
export const submitReview = (review, rating, movieId, username) => {
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