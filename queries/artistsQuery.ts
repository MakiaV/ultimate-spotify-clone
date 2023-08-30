import { gql } from "@apollo/client";

const GET_ARTISTS = gql`
	query {
		artists {
			id
			artistName
			artistPhoto
			artistBackground
			artistInfos
			artistAlbums {
				id
				albumName
				albumArtwork
				albumYear
				albumGenre {
					id
					genreName
				}
				albumBackground
				albumType
				songs {
					id
					songSrc
					songTitle
					# songPlaycount
					songLyric
					songArtist {
						id
						artistName
					}

					songAlbum {
						id
						albumName
						albumArtwork
						albumBackgroundColor1
						albumBackgroundColor2
						albumBackgroundTopColor1
						albumBackgroundTopColor2
						albumBackground
					}
				}
				albumArtist {
					id
					artistName
				}
			}
			artistLikes {
				id
				name
			}
			artistComments {
				id
				commentText
				commentUser {
					id
					name
				}
			}
		}
	}
`;

export default GET_ARTISTS;
