"use client";

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from "@apollo/client";
import { store } from "../redux/store";
import { Provider } from "react-redux";

import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import Player from "./components/Player";
import Main from "./components/Main";

const figtree = Figtree({ subsets: ["latin"] });

// export const metadata: Metadata = {
// 	title: "Spotify Clone",
// 	description: "The Ultimate Spotify Clone",
// };

const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
	cache: new InMemoryCache(),
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={figtree.className}>
				<ApolloProvider client={client}>
					<Provider store={store}>
						<Main>{children}</Main>
						<Player />
					</Provider>
				</ApolloProvider>
			</body>
		</html>
	);
}
