import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/strings';
const ax = axios.create({
  baseURL: SERVER_BASE_URL,
});

export default ax;
