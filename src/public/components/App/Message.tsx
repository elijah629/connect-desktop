import * as React from "react";

export interface MessageProps {
	html: string;
	date: Date;
}

const formatDate = Intl.DateTimeFormat([...navigator.languages], {
	dateStyle: "short",
	timeStyle: "short"
}).format;

export class Message extends React.Component<MessageProps> {
	render() {
		return (
			/* <img src="https://cdn.discordapp.com/avatars/650758567917518848/b1fadcd20e178da6b32fd48bf9f63c09.webp?size=160" /> */
			<div className="px-4 py-1 border-b-2 border-b-light-bg dark:border-b-dark-bg">
				<span className="font-bold">Elijah629</span>
				<span className="text-xs float-right">
					{formatDate(this.props.date)}
				</span>
				<span
					className="text-sm"
					dangerouslySetInnerHTML={{
						__html: this.props.html
					}}></span>
			</div>
		);
	}
}
