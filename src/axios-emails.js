import axios from 'axios';

// baseURL: 'http://localhost/cpmail_api/api/'
const instance = axios.create({
	baseURL: 'http://email.slbi.lk/api/'
});

export default instance;