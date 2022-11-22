import * as React from "react";
import { Room } from "./Room";

interface MessageBoxProps {
	room: Room;
}

const clamp = (value: number, min: number, max: number) =>
	value > max ? max : value < min ? min : value;

export class MessageBox extends React.Component<MessageBoxProps> {
	constructor(props: MessageBoxProps) {
		super(props);
		this.onInput = this.onInput.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	lastKeyEvent: React.KeyboardEvent<HTMLTextAreaElement>;

	onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		this.lastKeyEvent = e;
	}

	onInput(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		const target = e.target as HTMLTextAreaElement;
		target.rows = clamp(target.value.split("\n").length, 0, 14);

		if (this.lastKeyEvent.key === "Enter" && !this.lastKeyEvent.shiftKey) {
			e.preventDefault();
			// Emit to server
			this.props.room.addMessage(target.value);
			target.value = "";
			target.rows = 1;
		}
	}

	render(): React.ReactNode {
		const chatProps = this.props.room.props;
		return (
			<textarea
				rows={1}
				className="resize-none border-black border-solid border-2 w-full leading-tight box-border"
				onInput={this.onInput}
				onKeyDown={this.onKeyDown}
				placeholder={`Message #${chatProps.name}`}
			/>
		);
	}
}
