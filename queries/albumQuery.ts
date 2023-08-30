import { useQuery, gql } from "@apollo/client";

const GetAbum = (id: string) => {
	const GET_ALBUM = gql`
		query {
			album(id: "${id}") {
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

	const { loading, error, data } = useQuery(GET_ALBUM);
	if (loading) {
		return "Loading...";
	}
	// if (error) return <p>Error : {error.message}</p>;

	return data;
};

export default GetAbum;
