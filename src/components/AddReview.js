import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review: '',
            rating: 0,
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { review, rating } = this.state;
        const { submitReview, movieId, username } = this.props;

        // Add console logs to check the values
        console.log('Review:', review);
        console.log('Rating:', rating);
        console.log('Movie ID:', movieId);
        console.log('Username:', username);

        // Call an action to submit the review data
        submitReview(review, rating, movieId, username);

        // Reset the form
        this.setState({ review: '', rating: 0 });
    }
    

    render() {
        const { review, rating } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="review">
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="review"
                        value={review}
                        onChange={this.handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        type="number"
                        min="0"
                        max="5"
                        name="rating"
                        value={rating}
                        onChange={this.handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit Review
                </Button>
            </Form>
        );
    }
}

export default AddReview;
