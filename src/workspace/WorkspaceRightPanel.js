import React, { PropTypes } from 'react';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import NewsContainer from '../news/NewsContainer';
import VideoListContainer from '../video/VideoListContainer';
import PortfolioContainer from '../portfolio/PortfolioContainer';
import StatementContainer from '../statement/StatementContainer';

const components = [
	PortfolioContainer,
	StatementContainer,
	TradingTimesContainer,
	AssetIndexContainer,
	VideoListContainer,
	NewsContainer,
];

export default class WorkspaceRightPanel extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
	};

	render() {
		const { actions, workspace } = this.props;

		const ActiveComponent = components[workspace.rightActiveTab];

		return (
			<div
				className="workspace-panel"
				style={{ width: workspace.rightPanelSize }}
			>
				<ActiveComponent actions={actions} />
			</div>
		);
	}
}
