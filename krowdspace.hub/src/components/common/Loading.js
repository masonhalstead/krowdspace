import React from 'react';

const Loading = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <p>
        <i className="fas fa-spinner fa-spin" /> Loading...
      </p>
    );
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};
export default Loading;
