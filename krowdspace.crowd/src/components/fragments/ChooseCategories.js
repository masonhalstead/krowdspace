import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const categories = [
  {
    key: 'Art',
    id: 1
  },
  {
    key: 'Design',
    id: 2
  },
  {
    key: 'Technology',
    id: 3
  },
  {
    key: 'Comics',
    id: 4
  },
  {
    key: 'Film',
    id: 5
  },
  {
    key: 'Publishing',
    id: 6
  },
  {
    key: 'Illustrations',
    id: 7
  },
  {
    key: 'Food',
    id: 8
  },
  {
    key: 'Games',
    id: 9
  },
  {
    key: 'Music',
    id: 10
  },
  {
    key: 'Education',
    id: 11
  },
  {
    key: 'Travel',
    id: 12
  }
];

export const ChooseCategories = ({
  domain,
  category,
  handleCheckCategory,
  chooseToggleScreen
}) => {
  return (
    <React.Fragment>
      <h2 className="user-create-title">Select a category</h2>
      <Form.Group className="user-checkbox-flex">
        {categories.map(cat => {
          return (
            <Form.Check
              type="checkbox"
              className="user-checkbox-item"
              key={cat.id}
              onChange={() => handleCheckCategory(cat.key)}
              label={cat.key}
              checked={category === cat.key}
            />
          );
        })}
      </Form.Group>
      <Button
        className="btn-login"
        variant="primary"
        type="button"
        onClick={() => chooseToggleScreen({ toggle: 2 })}
        disabled={!category}
      >
        Confirm <span className="capitalize">{domain}</span> categories
      </Button>
    </React.Fragment>
  );
};
