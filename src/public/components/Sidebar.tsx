import * as React from "react";
import { SidebarIcon } from "./SidebarIcon";
import { BiPlus } from "react-icons/bi";

interface SidebarState {
	scrollTop: number;
}

export class Sidebar extends React.Component<unknown, SidebarState> {
	state = { scrollTop: 0 };

	render() {
		return (
			<div
				onScroll={e => {
					this.setState({
						...this.state,
						scrollTop: e.currentTarget.scrollTop
					});
				}}
				className="sb-invisible flex flex-col items-center gap-2 w-16 bg-light-bg dark:bg-gray-900 py-2 overflow-y-scroll">
				{Array(50)
					.fill(null)
					.map((_, i) => (
						<SidebarIcon
							key={i}
							buttonTooltip={i.toString()}
							icon={<BiPlus size={28} />}
							scroll={this.state.scrollTop}
						/>
					))}
			</div>
		);
	}
}
