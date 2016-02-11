import React, { PropTypes } from 'react';
import Resizer from '../_common/Resizer';
import TradesContainer from '../trades/TradesContainer';
import WorkspaceLeftPanel from './WorkspaceLeftPanel';
import WorkspaceRightPanel from './WorkspaceRightPanel';
import Tab from '../_common/Tab';
import TabList from '../_common/TabList';

const updateSizeWithBoundary = (size, update, min, max) => {
	if (size >= min && size <= max) {
		update(size);
	} else if (size < min) {
		update(10);
	}
};

export default class WorkspaceCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
	};

	render() {
		const { actions, workspace } = this.props;

		const onChangeLeftPanel = idx =>
			actions.updateWorkspaceField('leftActiveTab', idx);

		const onChangeRightPanel = idx =>
			actions.updateWorkspaceField('rightActiveTab', idx);

		return (
			<div id="panels">
				<TabList
					vertical
					showText={false}
					onChange={idx => onChangeLeftPanel(idx)}
				>
					<Tab imgSrc="img/trade.svg" text="Assets" />
					<Tab imgSrc="img/watchlist.svg" text="Watchlist" />
					<Tab imgSrc="img/info.svg" text="Details" />
				</TabList>
				{workspace.leftPanelVisible &&
					<WorkspaceLeftPanel actions={actions} workspace={workspace} />}
				<Resizer
					className="resizer-vertical"
					onResize={e => {
						const update = actions.updateWorkspaceField.bind(null, 'leftPanelSize');
						const size = e.x - 4;
						updateSizeWithBoundary(size, update, 100, 750);
					}}
				/>
				<div id="workarea">
					<TradesContainer
						actions={actions}
						tradeMode={workspace.tradeMode}
					/>
				</div>
				<Resizer
					className="resizer-vertical"
					onResize={e => {
						const update = actions.updateWorkspaceField.bind(null, 'rightPanelSize');
						const size = window.innerWidth - e.x - 4;
						updateSizeWithBoundary(size, update, 100, 700);
					}}
				/>
				{workspace.rightPanelVisible &&
					<WorkspaceRightPanel actions={actions} workspace={workspace} />}
				<TabList
					vertical
					showText={false}
					onChange={idx => onChangeRightPanel(idx)}
				>
					<Tab imgSrc="img/portfolio.svg" text="Open Positions" />
					<Tab imgSrc="img/statement.svg" text="Statement" />
					<Tab imgSrc="img/resources.svg" text="Trading Times" />
					<Tab imgSrc="img/resources.svg" text="Asset Index" />
					<Tab imgSrc="img/news.svg" text="Video" />
					<Tab imgSrc="img/news.svg" text="News" />
				</TabList>
			</div>
		);
	}
}
