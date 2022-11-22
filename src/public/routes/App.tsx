import * as React from "react";
// import { Room as Room } from "./Room";
// import { Tab, Tabs } from "./Tabs";

export class App extends React.Component {
	render() {
		return (
			<>
				{/* <Room name={"Test"} /> */}
				{/* <Tabs defaultTab={1}>
					<Tab title="Bob">a</Tab>
					<Tab title="Jim">b</Tab>
				</Tabs> */}
				{/* <Sidebar /> */}
				<p>App</p>
			</>
		);
	}
}
/**
 * ID's:
 *
 * Chats ( Guilds ):
 * SHA-256 of an increacing number that is on the server
 *
 * Rooms ( Channels ):
 * UUID v5 with namespace of the chat's increacing number ( not hash ) and name of the hash
 *
 */
