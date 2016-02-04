import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import WatchlistTable from './WatchlistTable';
import WatchlistSelectors from '../_selectors/WatchlistSelectors';

@connect(WatchlistSelectors)
export default class WatchlistContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		assets: React.PropTypes.object,
		ticks: React.PropTypes.object,
		watchlist: React.PropTypes.object,
	};

	render() {
		const { assets, ticks, watchlist } = this.props;
		return (
			<WatchlistTable
				ticks={ticks.toJS()}
				assets={assets.toJS()}
				watchlist={watchlist.toJS()}
			/>
		);
	}
}
