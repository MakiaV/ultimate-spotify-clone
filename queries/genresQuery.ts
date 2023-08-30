import { gql } from "@apollo/client";

const GET_GENRES = gql`
	query {
		genres {
			id
			genreName
			genreInfos
			genreImg
		}
	}
`;

export default GET_GENRES;
