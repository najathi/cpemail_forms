import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://email.slbi.lk/api/'
	// baseURL: 'http://localhost/cpmail_api/api/'
});

export default instance;