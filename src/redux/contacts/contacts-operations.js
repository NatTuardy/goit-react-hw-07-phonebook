import axios from 'axios';
import actions from "./contacts-actions";

axios.defaults.baseURL = "http://localhost:4000/contacts";

export const getContacts = () => async (dispatch) => {
  dispatch(actions.getContactsRequest());
  try {
    const { data } = await axios.get("/");
    dispatch(actions.getContactsSuccess(data));
  } catch (error) {
    dispatch(actions.getContactsError(error));
  }
};


export const addToContacts = (contact) => {
  const actionFunc = async (dispatch, getStore) => {
    dispatch(actions.addContactRequest());
    try {
      const { data } = await axios.post("/", contact);
      dispatch(actions.addContactSuccess(data));
    } catch (error) {
      dispatch(actions.addContactError(error));
    }
  };

  return actionFunc;
};

export const removeContact = (id) => {
  const actionFunc = async (dispatch) => {
    dispatch(actions.removeContactRequest());
    try {
      const removeContact = await axios.delete(`/${id}`);
      dispatch(actions.removeContactSuccess(id));
    } catch (error) {
      dispatch(actions.removeContactError(error));
    }
  };

  return actionFunc;
};
