import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const category_selector = [{
    key:'Art',
    id: 1
  },{
    key:'Design',
    id: 2
  },{
    key:'Technology',
    id: 3
  },{
    key:'Comics',
    id: 4
  },{
    key:'Film',
    id: 5
  },{
    key:'Publishing',
    id: 6
  },{
    key:'Illustrations',
    id: 7
  },{
    key:'Food',
    id: 8
  },{
    key:'Games',
    id: 9
  },{
    key:'Music',
    id: 10
  },{
    key:'Education',
    id: 11
  },{
    key:'Travel',
    id: 12
  }]

export const ChooseCategories = ({domain, categories, handleCheckCategory, chooseToggleScreen}) => {
    return (
    <React.Fragment>
    <h2 className="user-create-title">Select Maximum 3 Categories</h2>
    <Form.Group className="user-checkbox-flex">
      {category_selector.map((category) => {
        return <Form.Check
        type="checkbox"
        className="user-checkbox-item"
        key={category.id}
        onChange={() => handleCheckCategory(category.id)}
        label={category.key}
        checked={categories.includes(category.id)}
      />
      })}
    </Form.Group>
    <Button
      className="btn-login"
      variant="primary"
      type="button"
      onClick={() => chooseToggleScreen({toggle: 2})}
      disabled={(!categories.length || categories.length > 3)}
    >
      Confirm <span className="capitalize">{domain}</span> categories
    </Button>
  </React.Fragment>
)
}