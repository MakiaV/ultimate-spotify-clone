import { gql } from "@apollo/client";

export const GET_ALBUMS = gql`
	query {
		albums {
			id
			albumName
			albumArtwork
			albumYear
			albumGenre {
				id
				genreName
			}
			albumLikes
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
			albumArtist {
				id
				artistName
				artistPhoto
			}
		}
	}
`;
