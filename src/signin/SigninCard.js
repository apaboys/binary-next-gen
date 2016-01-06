import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { ErrorMsg, InputGroup, LanguagePicker, LogoSpinner, M } from '../_common';

export default class SigninCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
		signin: PropTypes.object.isRequired,
	};

	onTokenChange(event) {
		this.props.actions.updateToken(event.target.value);
		this.props.actions.signinFieldUpdate('validatedOnce', false);
		this.props.actions.signinFieldUpdate('credentialsInvalid', false);
	}

	trySignin() {
		const { actions, history } = this.props;
		actions.signinFieldUpdate('progress', true);
		actions.signinFieldUpdate('validatedOnce', true);
		history.push('/'); // no need to authorize here onEnter hook will authorize
	}

	render() {
		const { progress, validatedOnce, credentialsInvalid, tokenNotEntered } = this.props.signin.toJS();

		return (
			<div className="startup-content">
				<form className="mobile-form" onSubmit={e => e.preventDefault()}>
					<p className="media">
						<LogoSpinner spinning={progress}/>
						<img className="logo-text" src="img/binary-type-logo.svg" />
					</p>
					<InputGroup
						id="token-input"
						type="text"
						placeholder="Token"
						onChange={::this.onTokenChange}
						autoFocus
						min={15}
						autoComplete="off"
					/>
					<ErrorMsg
						shown={validatedOnce && tokenNotEntered}
						text="You need to enter a token"
					/>
					<ErrorMsg
						shown={validatedOnce && credentialsInvalid && !tokenNotEntered}
						text="Access denied"
					/>
					<LanguagePicker />
					<button className="btn-primary" onClick={::this.trySignin}>
						<M m="Sign In" />
					</button>
				</form>
				<fieldset>
					<Link to="/create-account" className="btn-secondary">
						<M m="Create Account" />
					</Link>
				</fieldset>
			</div>
		);
	}
}
