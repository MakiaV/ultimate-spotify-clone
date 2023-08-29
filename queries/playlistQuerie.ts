import { gql } from "@apollo/client";

export const GET_PLAYLISTS = gql`
	query {
		playlists {
			id
			playlistName
			playlistOwner {
				id
				name
			}
			playlistLikes
			isUserPlaylist
			playlistArtwork
			playlistArtists {
				id
				artistName
			}
			playlistDescription
			albumSongs {
				id
				songTitle
				songGenre {
					id
					genreName
				}
				songArtist {
					id
					artistName
				}
				songPlaycount
				songSrc
				albumArtwork
			}
		}
	}
`;
