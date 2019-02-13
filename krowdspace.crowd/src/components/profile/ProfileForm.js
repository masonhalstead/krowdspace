import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const ProfileForm = ({name, email, kickstarter_user, indiegogo_user, valid, handleOnInput, handleSubmit}) => {
    return (
        <Form autoComplete="off" onSubmit={handleSubmit}>
            <Form.Label>User Information</Form.Label>
            <Form.Group>
              <Form.Control
                name="name"
                onChange={e => handleOnInput(e)}
                value={name}
                type="text"
                placeholder="Enter full name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="email"
                onChange={e => handleOnInput(e)}
                value={email}
                type="email"
                placeholder="Enter email address"
              />
            </Form.Group>
            <Form.Label>Crowdfunding Profiles</Form.Label>
            <Form.Group>
              <Form.Control
                name="kickstarter_user"
                onChange={e => handleOnInput(e)}
                value={kickstarter_user}
                type="text"
                placeholder="Kickstarter user"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="indiegogo_user"
                onChange={e => handleOnInput(e)}
                value={indiegogo_user}
                type="text"
                placeholder="Indiegogo user"
              />
            </Form.Group>
            <Button
              className="btn-login"
              variant="primary"
              type="submit"
              disabled={!valid}
            >
              Update profile
            </Button>
            
          </Form>
    )
}