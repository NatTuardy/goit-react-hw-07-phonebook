import { configureStore } from "@reduxjs/toolkit";
// import { persistStore } from "redux-persist";
// import persistedReducer from "./rootReducer";
import { rootReducer } from "./contacts/contacts-reducers";


export const store = configureStore({
    reducer: {
        contacts: rootReducer
    },
});

