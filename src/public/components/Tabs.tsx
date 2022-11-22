import * as React from "react";

interface TabsState {
	currentTab: number;
}

interface TabsProps {
	defaultTab?: number;
	children: React.ReactNode;
}

export class Tabs extends React.Component<TabsProps, TabsState> {
	constructor(props: TabsProps) {
		super(props);

		this.state = {
			currentTab: props.defaultTab ?? 0
		};
		this.switchTab = this.switchTab.bind(this);
	}

	switchTab(tab: number) {
		this.setState({
			...this.state,
			currentTab: tab
		});
	}

	render() {
		return (
			<div>
				<div>
					{(
						React.Children.toArray(
							this.props.children
						) as unknown as Tab[]
					).map((tab, i) => {
						return (
							<p
								key={i}
								onClick={() =>
									this.setState({
										...this.state,
										currentTab: i
									})
								}>
								{tab.props.title}
							</p>
						);
					})}
				</div>
				<div>
					{
						React.Children.toArray(this.props.children)[
							this.state.currentTab
						]
					}
				</div>
			</div>
		);
	}
}

interface TabProps {
	title: string;
	children: React.ReactNode;
}

export class Tab extends React.Component<TabProps> {
	render() {
		return this.props.children;
	}
}
