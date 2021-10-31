import {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";

import ContactForm from "./components/contactForm/ContactForm";
import ContactList from "./components/contactList/ContactList";
import Filter from "./components/filter/Filter";

import actions from "./redux/contacts/contacts-actions";
import {
  getAllContacts,
  getFilter,
} from "./redux/contacts/contacts-selectors";
import { getContacts, addToContacts, removeContact, } from './redux/contacts/contacts-operations'
import "./App.css";

const App = () => {
  const contactsItems = useSelector(getAllContacts);
  const filterString = useSelector(getFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    const actionFunc = getContacts();
    dispatch(actionFunc);
  }, [dispatch]);

  const handleFilter = () => {
    const filteredContacts = contactsItems.filter((item) =>
      item.name.toLowerCase().includes(filterString.toLowerCase())
    );
    return filteredContacts;
  };

  const handleChange = ({ target }) => {
    const { value} = target;
    dispatch(actions.setFilter(value))
  };

  const handleSubmit = (newContact) => {
    const findDoubleContact = contactsItems.find(
      (contact) => contact.name === newContact.name
    );
    if (findDoubleContact) {
      alert(`${findDoubleContact.name} is already in contacts`);
    } else {
      const action = addToContacts(newContact);
      console.log(action)
      dispatch(action);
    }
  };

  const handleDelete = (id) => {
    dispatch(removeContact(id));
  };

  return (
    <div className="App">
      <h1 className="App-header">Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />
      <Filter onChange={handleChange} data={contactsItems} filter={filterString} />
      <ContactList data={handleFilter()} onDelete={handleDelete} />
    </div>
  );
};

export default App;
