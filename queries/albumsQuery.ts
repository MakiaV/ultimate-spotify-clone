import { gql } from "@apollo/client";

const GET_ALBUMS = gql`
	query {
		albums {
			id
			albumName
			albumArtwork
			albumBackground
			albumYear
			albumGenre {
				id
				genreName
			}
			albumType
			songs {
				id
				songSrc
				songTitle
				songLyric
				songArtist {
					id
					artistName
				}

				songAlbum {
					id
					albumName
					albumArtwork
					albumBackground
				}
			}
			albumArtist {
				id
				artistName
				artistPhoto
			}
			albumLikes {
				id
			}
		}
	}
`;

export default GET_ALBUMS;
