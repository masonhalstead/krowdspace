export const core = {
    getLocalStorage: function() {
    return {
        name: localStorage.getItem('name') || false,
        email: localStorage.getItem('email') || false,
        active: !!localStorage.getItem('token'),
        token: localStorage.getItem('token') || false,
        _id: localStorage.getItem('_id') || false
    }
  },
  setLocalStorage: function(state) {
    localStorage.setItem('name', state.name);
    localStorage.setItem('email', state.email);
    localStorage.setItem('_id', state._id);
  }
};
