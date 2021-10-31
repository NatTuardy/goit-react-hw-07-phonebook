import { createReducer, combineReducers  } from "@reduxjs/toolkit";
// import {addToContacts, removeFromContacts, updateFilter} from './contacts-actions'
import actions from "./contacts-actions";

export const contactItemsReducer = createReducer([], {
    [actions.getContactsSuccess]: (_, { payload }) => payload,
    [actions.addContactSuccess]: (store, {payload})=> {
        store.push(payload);
    },
    [actions.removeContactSuccess]: (store, {payload})=> {
        const idx = store.findIndex(({id}) => id === payload);
        store.splice(idx, 1);
    }
});
const loadingReducer = createReducer(false, {
    [actions.getContactsRequest]: () => true,
    [actions.getContactsSuccess]: () => false,
    [actions.getContactsError]: () => false,
    [actions.addContactRequest]: () => true,
    [actions.addContactSuccess]: () => false,
    [actions.addContactError]: () => false,
    [actions.removeContactRequest]: () => true,
    [actions.removeContactSuccess]: () => false,
    [actions.removeContactError]: () => false,
  });

  const errorReducer = createReducer(null, {
    [actions.getContactsError]: (_, { payload }) => payload,
    [actions.getContactsRequest]: () => null,
    [actions.addContactError]: (_, { payload }) => payload,
    [actions.addContactRequest]: () => null,
    [actions.removeContactError]: (_, { payload }) => payload,
    [actions.removeContactRequest]: () => null,
  });

export const contactFilterReducer = createReducer('', {
    [actions.setFilter]: (store, {payload})=> {
        return payload
    }
})

export const rootReducer = combineReducers({
    items: contactItemsReducer,
    filter: contactFilterReducer,
    loading: loadingReducer,
    error: errorReducer,
  });