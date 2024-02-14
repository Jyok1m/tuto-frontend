import "@/styles/globals.css";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";

const reducers = combineReducers({ user });

const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
