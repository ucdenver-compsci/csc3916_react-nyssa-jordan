import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

const env = process.env;
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

    handleSubmit = async (event) => {
        event.preventDefault();
        const { review, rating } = this.state;
        const { movieId, username } = this.props;
        
        let payload = {
            review,
            rating,
            movieId,
            username,
        };
        const requestOptions = {
            method: 'POST',
            headers: 
            { 
                'Content-Type': 'application/json', 
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify( payload )
        };
        const response = await fetch(env.REACT_APP_API_URL+"/reviews", requestOptions);
        const data = await response.json();
        window.location.reload();

        // // Call the submitReview action with individual parameters
        // try {
        //     await submitReview(review, rating, movieId, username);
        //     // Reset the form
        //     this.setState({ review: '', rating: 0 });
        // } catch (error) {
        //     console.error('Error submitting review:', error);
        // }
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

