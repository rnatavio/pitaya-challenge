'use strict';

const React = require('react');
const ReactDOM = require('react-dom')

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {tweets: [], attributes: []}; 
		this.fetchTweets = this.fetchTweets.bind(this);
        this.fetchTweets();
	}
	
	
	fetchTweets() {
		fetch("/tweeter")
		.then(function(response) {
			  var text = '';
			  var reader = response.body.getReader()
			  var decoder = new TextDecoder();
			  
			  return readChunk();

			  function readChunk() {
				return reader.read().then(appendChunks);
			  }

			  function appendChunks(result) {
				var chunk = decoder.decode(result.value || new Uint8Array, {stream: !result.done});
				text += chunk;
				if (result.done) {
					this.setState({tweets:JSON.parse(text)});
				  return JSON.parse(text);
				} else {
				  return readChunk();
				}
			  }
		}).then(function(tweets) {
			return tweets;
		});
	}

	render() {
		//FIXME: this.state is undefined. need to pass the tweets array
		return (
			<div>
				<TweetList tweets={this.state.tweets}/>
			</div>
		)

	}
}


class TweetList extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.tweets);
		var tweets;
		if (this.props.tweets) {
			tweets = this.props.tweets(tweet =>
				<Tweet tweet={tweet}/>
			);
		}
		return (
			<div>
				<table>
					<tbody>
						<tr>
							<th>To User</th>
							<th>Text</th>
						</tr>
						{tweets}
					</tbody>
				</table>
			</div>
		)
	}
}

class Tweet extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<tr>
				<td>{this.props.tweet.inReplyToScreenName}</td>
				<td>{this.props.tweet.text}</td>
			</tr>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
