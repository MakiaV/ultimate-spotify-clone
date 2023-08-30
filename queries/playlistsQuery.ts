import { gql } from "@apollo/client";

const GET_PLAYLISTS = gql`
	query {
		playlists {
			id
			playlistName
			playlistDescription
			playlistLikes {
				id
			}
			playlistOwner {
				id
			}
			playlistArtwork
			isUserPlaylist

			playlistArtists {
				id
				artistName
			}

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
		}
	}
`;

export default GET_PLAYLISTS;
