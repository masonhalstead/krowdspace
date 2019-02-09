import store from '../../store/index';
import { toggleModal, setError, setLoading } from '../../actions/index';

export const core = {
    getLocalStorage: function() {
    return {
        name: localStorage.getItem('name') || false,
        email: localStorage.getItem('email') || false,
        password_reset: localStorage.getItem('password_reset') || false,
        active: !!localStorage.getItem('token'),
        token: localStorage.getItem('token') || false,
        _id: localStorage.getItem('_id') || false
    }
  },
  setLocalStorage: function(state) {
    localStorage.setItem('name', state.name);
    localStorage.setItem('email', state.email);
    localStorage.setItem('password_reset', state.password_reset);
    localStorage.setItem('_id', state._id);
  },
  removeLocalStorage: function() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('password_reset');
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
  },
  handleError: function(err) {
    let error = err.response
      ? err.response.data
      : 'Error getting a successful response from the API';

    store.dispatch(setError(error));
    store.dispatch(toggleModal({ user_error: true }));
    store.dispatch(setLoading(false));
  },
  passwordValidation: function(state) {
    // Resetting password strength
    state.password_strength = 0;

    // Checking for special characters
    if(/[!@#$%^&*(),.?":{}|<>]/.test(state.password))state.password_strength++

    // Checking for numbers
    if(/[0-9]/.test(state.password))state.password_strength++

    // Checking for uppercase letters
    if(/[A-Z]/.test(state.password))state.password_strength++

    // Checking for lowercase letters
    if(/[a-z]/.test(state.password))state.password_strength++

    return state;
  }
};
