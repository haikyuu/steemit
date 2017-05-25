import React from 'react'
import PropTypes from 'prop-types'
import { setPropTypes, compose, mapProps } from 'recompose'
import { repLog10, } from '../../utils'
import './Article.css'
import timeago from 'timeago.js';

import Icon from 'react-ionicons'

const Article = (props) => (
  <article className="article">
	<div className="container">
		<span className="thumbnail"/>
		
		<div className="header">
			<h3 className="title">
				<a className="unstyled-link" href="#a">{props.title}</a>
			</h3>
		</div>

		<div className="body">
			<a className="unstyled-link" href="#a">{props.body}</a>
		</div>

		<div className="footer">
			<span className="payout separated">
				<Icon className="icon" icon="ion-arrow-up-b"/>{props.pending_payout_value}
			</span>
			<span className="votes separated">
				<Icon className="icon" icon="ion-ios-arrow-up"/>{props.net_votes}
			</span>
			<span className="children separated"><Icon className="icon" icon="ion-chatboxes"/>{props.children}</span>
			<span className="reblog separated">
				<a className="unstyled-link" href="#a"><Icon className="icon" icon="ion-arrow-return-right"/></a>
			</span>
			<span className="info">{
				`${props.created} by ${props.author}
		 		${props.author_reputation} in ${props.category}`
			}</span>
		</div>

	</div>

  </article>
)

export default compose(
	setPropTypes({
		title: PropTypes.string,
		body: PropTypes.string,
		pending_payout_value: PropTypes.string,
		net_votes: PropTypes.number,
		children: PropTypes.number,
		created: PropTypes.string,
		author: PropTypes.string,
		category: PropTypes.string,
		author_reputation: PropTypes.string,
	}),
	//parse props for our dumb component
	mapProps(props=>({
		...props,
		body: props.body.substr(0, 120),
		created: timeago().format(props.created),
		author_reputation: repLog10(props.author_reputation),
	}))
)(Article)
