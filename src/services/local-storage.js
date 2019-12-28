import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    toast.warning("Could't save the last change");
  }
};

const get = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return null;
  }
};

export default {
  get,
  save,
};
