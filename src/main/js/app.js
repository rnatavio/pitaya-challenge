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
				  return JSON.parse(text);
				} else {
				  return readChunk();
				}
			  }
		}).then(function(tweets) {
            //this.setState({tweets:JSON.parse(text)});
            console.log("@fetchTweets() app.js line 40");
            console.log(tweets);
			return tweets;
		});
	}

	render() {
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
		var tweets;
		if (this.props.tweets) {
            tweets = this.props.tweets.map(function(tweet) {
                return (
                    <tr>
                        <td>{tweet.inReplyToScreenName}</td>
                        <td>{tweet.text}</td>
                    </tr>
                )
            });
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
