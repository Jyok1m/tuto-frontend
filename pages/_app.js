import "@/styles/globals.css";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"; // Persistor
import { PersistGate } from "redux-persist/integration/react";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
	return {
		getItem() {
			return Promise.resolve(null);
		},
		setItem(value) {
			return Promise.resolve(value);
		},
		removeItem() {
			return Promise.resolve();
		},
	};
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

import user from "../reducers/user";

const reducers = combineReducers({ user });

const persistConfig = {
	key: "tuto",
	storage,
	blacklist: [],
	whitelist: ["user"],
};

const persistedReducers = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	);
}
