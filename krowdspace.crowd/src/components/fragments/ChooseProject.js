import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const ChooseProject = ({
  url_valid,
  url,
  domain,
  agree,
  valid,
  handleOnInput,
  handleValidation,
  handleSubmit
}) => {
  return (
    <React.Fragment>
      <h2 className="user-create-title">Input crowdfunding link</h2>
      <div className="user-password-container">
        <Form.Label className="user-password-label">Project Link</Form.Label>
        {url_valid !== 2 && (
          <Form.Label className="krowdspace-danger">Valid Link</Form.Label>
        )}
        {url_valid === 2 && (
          <Form.Label className="krowdspace-success">Valid Link</Form.Label>
        )}
        <div />
      </div>
      <Form.Group>
        <Form.Control
          type="text"
          name="url"
          onChange={e => handleOnInput(e)}
          value={url}
          placeholder={`https://www.${domain}.com/project-link`}
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          onChange={handleValidation}
          label="I have permissions to submit this project"
          checked={agree}
        />
      </Form.Group>
      <Button
        className="btn-login"
        variant="primary"
        type="button"
        onClick={handleSubmit}
        disabled={!valid}
      >
        Sync <span className="capitalize">{domain}</span> project
      </Button>
    </React.Fragment>
  );
};
