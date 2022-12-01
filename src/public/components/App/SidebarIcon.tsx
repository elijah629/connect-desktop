import * as React from "react";

interface SidebarProps {
	icon: React.ReactNode;
	buttonTooltip: string;
	scroll: number;
}

export class SidebarIcon extends React.Component<SidebarProps> {
	render() {
		return (
			<div className="sidebar-icon group">
				{this.props.icon}
				<span
					style={{
						translate: `0 ${-this.props.scroll}px`
					}}
					className="tooltip left-[70px] group-hover:opacity-100">
					{this.props.buttonTooltip}
				</span>
			</div>
		);
	}
}
