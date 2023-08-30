import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	playlist: null,
	playlistSongs: null,
	playlistIsPlaying: false,
	currentSongIndex: 0,
	selectedPlaylist: null,
	repeatOneSong: false,
	lyrics: null,
	user: null,
	amount: "",
};

const mod = (n, m) => {
	return ((n % m) + m) % m;
};

const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		getLyric: (state, action) => {
			state.lyrics = action.payload.lyrics;
		},
		selectedPlaylist: (state, action) => {
			state.selectedPlaylist = action.payload.playlist;
		},
		playPause: (state, action) => {
			if (state.playlistIsPlaying) {
				state.playlistIsPlaying = false;
			} else {
				state.playlistIsPlaying = true;
			}
		},
		updatePlaylist: (state, action) => {
			if (Number.isInteger(action.payload.currentSongIndex)) {
				if (
					JSON.stringify(
						action.payload.playlist.songs.map(
							(song) => song.songSrc
						)
					) !== JSON.stringify(state.playlistSongs)
				) {
					state.playlist = action.payload.playlist;

					state.playlistSongs = action.payload.playlist.songs.map(
						(song) => song.songSrc
					);
					state.playlistIsPlaying = true;
					state.currentSongIndex = 0;
					state.repeatOneSong = false;
				} else {
					state.playlistIsPlaying = !state.playlistIsPlaying;
				}
			}
		},
		selectSongFromPlaylist: (state, action) => {
			if (
				JSON.stringify(state.playlistSongs) ===
				JSON.stringify(
					action.payload.selectedPlaylist.songs.map(
						(song) => song.songSrc
					)
				)
			) {
				if (state.currentSongIndex === action.payload.index) {
					state.currentSongIndex = action.payload.index;
					state.playlistIsPlaying = !state.playlistIsPlaying;
					state.repeatOneSong = false;
				} else {
					state.currentSongIndex = action.payload.index;

					state.playlistIsPlaying = true;

					state.playlistSongs =
						action.payload.selectedPlaylist.songs.map(
							(song) => song.songSrc
						);
					state.repeatOneSong = false;
				}
			} else {
				state.currentSongIndex = action.payload.index;
				state.playlistIsPlaying = true;
				state.playlistSongs = action.payload.selectedPlaylist.songs.map(
					(song) => song.songSrc
				);
				state.playlist = action.payload.selectedPlaylist;
				state.repeatOneSong = false;
			}
		},
		nextSong: (state, action) => {
			state.playlistIsPlaying = true;

			state.repeatOneSong = false;
			state.currentSongIndex =
				(state.currentSongIndex + 1) % state.playlistSongs.length;
		},
		nextSongOnEnded: (state, action) => {
			if (state.repeatOneSong) {
				state.playlistIsPlaying = true;
				state.currentSongIndex =
					state.currentSongIndex % state.playlistSongs.length;
			} else {
				state.playlistIsPlaying = true;
				state.currentSongIndex =
					(state.currentSongIndex + 1) % state.playlistSongs.length;
			}
		},
		previousSong: (state, action) => {
			state.playlistIsPlaying = true;

			(state.currentSongIndex = mod(
				state.currentSongIndex - 1,
				state.playlistSongs.length
			)),
				(state.repeatOneSong = false);
		},
		repeatOne: (state, action) => {
			state.repeatOneSong = !state.repeatOneSong;
		},
		shuffle: (state, action) => {
			state.playlistSongs = action.payload.playlist;
		},
		getAmount: (state, action) => {
			state.amount = action.payload.amount;
		},
	},
});

export const {
	selectedPlaylist,
	updatePlaylist,
	playPause,
	nextSong,
	nextSongOnEnded,
	previousSong,
	selectSongFromPlaylist,
	getLyric,
	repeatOne,
	shuffle,
	getAmount,
} = playerSlice.actions;
export default playerSlice.reducer;
