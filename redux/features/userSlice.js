import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userPlaylists: null,
	artistFollow: null,
	artistLikes: null,
	albumLikes: null,
	playlistLikes: null,
	songs: null,
	name: "",
	email: "",
	image: "",
	playlistNumber: 0,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		playlistNumber: (state, action) => {
			state.playlistNumber = state.playlistNumber + 1;
		},
		userPlaylists: (state, action) => {
			state.userPlaylists = action.payload;
		},
		artistFollow: (state, action) => {
			state.artistFollow = action.payload.artistFollow;
		},
		artistLikes: (state, action) => {
			state.artistLikes = action.payload.artistLikes;
		},
		albumLikes: (state, action) => {
			state.albumLikes = action.payload.albumLikes;
		},
		playlistLikes: (state, action) => {
			state.playlistLikes = action.payload.playlistLikes;
		},
		songs: (state, action) => {
			state.songs = action.payload.songs;
		},
	},
});

export const {
	userPlaylists,
	artistFollow,
	artistLikes,
	albumLikes,
	playlistLikes,
	songs,
	playlistNumber,
} = userSlice.actions;
export default userSlice.reducer;
