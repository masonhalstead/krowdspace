import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';

export const ChooseSource = ({ handleOnSelect }) => {
  const buttons = [{ text: 'kickstarter' }, { text: 'indiegogo' }];
  return (
    <React.Fragment>
      <h2 className="user-create-title">Select crowdfunding site</h2>
      {buttons.map((item, index) => {
        return (
          <Button
            key={index}
            className="btn-login"
            variant="secondary"
            type="button"
            onClick={() => handleOnSelect(item.text)}
          >
            <FontAwesomeIcon icon={['fab', 'google']} className="google-icon" />
            <span className="btn-login-text capitalize">{item.text}</span>
          </Button>
        );
      })}
    </React.Fragment>
  );
};
