import store from '../../store/index';
import moment from 'moment';
import { toggleModal, setError, setLoading } from '../../actions/index';

export const core = {
  getLocalStorage: function() {
    return {
      name: localStorage.getItem('name') || false,
      email: localStorage.getItem('email') || false,
      password_reset: JSON.parse(localStorage.getItem('password_reset')) || false,
      active: !!localStorage.getItem('token'),
      token: localStorage.getItem('token') || false,
      _id: localStorage.getItem('_id') || false
    };
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
    if (/[!@#$%^&*(),.?":{}|<>]/.test(state.password))
      state.password_strength++;

    // Checking for numbers
    if (/[0-9]/.test(state.password)) state.password_strength++;

    // Checking for uppercase letters
    if (/[A-Z]/.test(state.password)) state.password_strength++;

    // Checking for lowercase letters
    if (/[a-z]/.test(state.password)) state.password_strength++;

    return state;
  },
  abbreviateNumber: function(number, decPlaces) {
    decPlaces = Math.pow(10, decPlaces);
    let numberAbs = Math.abs(number);
    // Enumerate number abbreviations
    var abbrev = ['K', 'M', 'B', 'T'];
    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {
      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10, (i + 1) * 3);
      // If the number is bigger or equal do the abbreviation
      if (size <= numberAbs) {
        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
        // This gives us nice rounding to a particular decimal place.
        numberAbs = Math.round((numberAbs * decPlaces) / size) / decPlaces;
        // Handle special case where we round up to the next abbreviation

        // Add the letter for the abbreviation
        numberAbs += abbrev[i];

        // We are done... stop
        break;
      }
    }
    return Math.sign(number) === -1 ? `-${numberAbs}` : numberAbs;
  },
  formatNumber: function(number, type) {
    const float_number = parseFloat(number);

    if (Number.isInteger(Number.parseInt(number, 10)) || type === 'date') {
      switch (type.toLowerCase()) {
        case 'number-abbr':
        return this.abbreviateNumber(float_number, 1);
        case 'number-whole':
          return  Math.floor(float_number).toLocaleString();
        case 'currency':
          return '$' + float_number.toFixed(2);
        case 'currency-int':
          return '$' + Math.floor(number).toLocaleString();
        case 'currency-abbr':
          return '$' + this.abbreviateNumber(float_number, 1);
        case 'percentage-abbr':
          return this.abbreviateNumber(float_number, 1) + '%';
        case 'percentage':
          return Math.floor(float_number).toLocaleString() + '%';
        case 'date':
          return moment(number).format('MMM D');
        default:
          return number;
      }
    }
    return number;
  }
};
