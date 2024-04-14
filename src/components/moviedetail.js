import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import { connect } from 'react-redux';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { Image } from 'react-bootstrap';
import AddReview from './AddReview';
import { submitReview } from '../actions/reviewActions';

class MovieDetail extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    render() {
        const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div><font color={"black"}>Loading....</font></div>;
            }
            if (!this.props.selectedMovie.title) {
                return <div><font color={"black"}>Need Title</font></div>;
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageUrl} style={{ maxWidth: '30%', height: 'auto' }} />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {this.props.selectedMovie.actors.map((actor, i) =>
                                <p key={i}>
                                    <b>{actor.actorName}</b> {actor.characterName}
                                </p>)}
                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill /> {this.props.selectedMovie.average_rating}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.reviews && this.props.selectedMovie.reviews.map((review, i) =>
                            <p key={i}>
                                <b>{review.username}</b>&nbsp; {review.review}
                                &nbsp; <BsStarFill /> {review.rating}
                            </p>
                        )}
                        <AddReview
                            submitReview={this.props.submitReview}
                            movieId={this.props.movieId}
                            username={localStorage.getItem('username')}
                        />
                    </Card.Body>
                </Card>
            )
        }

        return (
            <DetailInfo />
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        submitReview: (review, rating, movieId, username) =>
            dispatch(submitReview(review, rating, movieId, username)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
