const userInitialState = {
  first_name: 'Mason',
  last_name: 'Halstead',
  email: 'mason@krowdspace.com',
  private_key: '',
  public_key: ''
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
