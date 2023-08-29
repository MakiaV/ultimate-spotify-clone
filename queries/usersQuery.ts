import { gql } from "@apollo/client";

export const GET_USERS = gql`
	query {
		users {
			id
			name
			email
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
			userPlaylists {
				id
				playlistName
			}
		}
	}
`;
