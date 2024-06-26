import constants from '../constants/actionTypes';

let initialState = {
    movies: [],
    selectedMovie: null
};

const movieReducer = (state = initialState, action) => {
    let updated = Object.assign({}, state);
    switch(action.type) {
        case constants.FETCH_MOVIES:
            updated['movies'] = action.movies;
            updated['selectedMovie'] = action.movies[0];
            return updated;
        case constants.SET_MOVIE:
            updated['selectedMovie'] = action.selectedMovie;
            return updated;
        case constants.FETCH_MOVIE:
            updated['selectedMovie'] = action.selectedMovie;
            return updated;
        case 'SUBMIT_REVIEW':
            const { review, rating, movieId, username } = action.payload;
            if (updated.selectedMovie && updated.selectedMovie.id === movieId) {
                const updatedMovie = {
                    ...updated.selectedMovie,
                    reviews: [
                        ...updated.selectedMovie.reviews,
                        { review, rating, username }
                    ]
                };
                updated['selectedMovie'] = updatedMovie;
            }
            return updated;
        default:
            return state;
    }
};

export default movieReducer;

