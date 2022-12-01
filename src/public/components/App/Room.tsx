import { marked } from "marked";
import * as React from "react";
import { Message, MessageProps } from "./Message";
import { MessageBox } from "./MessageBox";

interface RoomProps {
	name: string;
}

interface RoomState {
	messages: React.CElement<MessageProps, Message>[];
}

export class Room extends React.Component<RoomProps, RoomState> {
	constructor(props: RoomProps) {
		super(props);
		this.state = { messages: [] };
		this.addMessage = this.addMessage.bind(this);
	}

	addMessage(markdown: string) {
		const html = marked.parse(markdown);

		if (html) {
			this.setState({
				...this.state,
				messages: this.state.messages.concat(
					<Message
						date={new Date()}
						html={html}
					/>
				)
			});
		}
	}

	render(): React.ReactNode {
		return (
			<div className="flex flex-col">
				<div className="flex flex-col w-full flex-grow">
					{/* Use message ID's for key in the not so distant future */}
					{this.state.messages.map((x, i) => ({ ...x, key: i }))}
				</div>
				<MessageBox room={this} />
			</div>
		);
	}
}
