import store from '../../store/index';
import { toggleModal, setError, setLoading } from '../../actions/index';

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
  },
  removeLocalStorage: function() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
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
  }
};
