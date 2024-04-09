import React from 'react'
import PropTypes from "prop-types"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

export const UpdateUser = ({ formData, handleUpdate, handleSubmit, handleDeleteAccount }) => {

    return (
        <Row>
            <Form onSubmit={handleSubmit}>
                <h3>Update profile information</h3>
                <Form.Group className='mb-2'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        minLength={4}
                        value={formData.Username}
                        onChange={(e) => handleUpdate(e)}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Label>Password:
                        <span> Your new password must be at least 8 characters long.</span>
                    </Form.Label>
                    <Form.Control
                        type="password"
                        minLength={8}
                        value={formData.Password}
                        onChange={(e) => handleUpdate(e)}
                        required
                    />
                </Form.Group >
                <Form.Group className='mb-2'>
                    <Form.Label> Email: </Form.Label>
                    <Form.Control
                        type="email"
                        value={formData.Email}
                        onChange={(e) => handleUpdate(e)}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-4'>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        value={formData.Birthday.slice(0, 10)}
                        onChange={(e) => handleUpdate(e)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" >Submit Changes</Button>
                <Button
                    onClick={() => handleDeleteAccount()}
                    variant="outline-secondary"
                    className="mx-3" >
                    Delete account
                </Button>
            </Form>
        </Row>
    )
}
UpdateUser.propTypes = {
    formData: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleDeleteAccount: PropTypes.func.isRequired
};