import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: { firstname: null }, // Valeur initiale du reducer
};

export const userSlice = createSlice({
	name: "user", // Nom du reducer à exporter
	initialState,
	// Fonctions à importer dans les composants pour agir sur le reducer
	reducers: {
		connectUser: (state, action) => {
			state.value.firstname = action.payload.firstname;
      console.log(action.payload.firstname);
		},
		disconnectUser: (state) => {
			state.value.firstname = null;
		},
	},
});

export const { connectUser, disconnectUser } = userSlice.actions;
export default userSlice.reducer;