import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
export const ProfileProjectForm = ({
  handleProductMarketing,
  allow_marketing,
  category,
  handleProjectCategory,
  featured,
  retail_url,
  handleFeaturedProject,
  valid,
  handleToggleModal,
  handleOnInput,
  handleSubmit
}) => {
  return (
    <Form className="profile-user-form" autoComplete="off" onSubmit={handleSubmit}>
    <div className="profile-form-wrapper">
      <Form.Group>
      <Form.Label className="profile-modal" onClick={() => handleToggleModal({ project_settings: true })}>
        Project Settings
        </Form.Label>
        <Form.Control value={featured} as="select" onChange={handleFeaturedProject}>
            <option value={false}>Featured Project Off</option>
            <option value={true}>Featured Project On</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control value={category} as="select" onChange={handleProjectCategory}>
            <option>Art</option>
            <option>Design</option>
            <option>Technology</option>
            <option>Comics</option>
            <option>Film</option>
            <option>Publishing</option>
            <option>Illustrations</option>
            <option>Food</option>
            <option>Games</option>
            <option>Music</option>
            <option>Education</option>
            <option>Travel</option>
        </Form.Control>
      </Form.Group>
    </div>
    <div className="profile-form-wrapper">
    <Form.Label className="profile-modal" onClick={() => handleToggleModal({ project_marketing: true })}>
        Allow Product Marketing
        </Form.Label>
        <Form.Group>
        <Form.Control value={allow_marketing} as="select" onChange={handleProductMarketing}>
            <option value={false}>Product Marketing Off</option>
            <option value={true}>Product Marketing On</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control
          name="retail_url"
          onChange={e => handleOnInput(e)}
          value={retail_url}
          type="text"
          placeholder="Retail Product link"
        />
      </Form.Group>
      <Button
        className="btn-login"
        variant="primary"
        type="submit"
        disabled={!valid}
      >
        Update project
      </Button>
    </div>
    </Form>
  );
};
