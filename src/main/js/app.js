'use strict';

const React = require('react');
const ReactDOM = require('react-dom')

class App extends React.Component {

	constructor(props) {
		super(props);
	}
    
	render() {
		return (
            <div>
                <div className="header"><img src="https://img.clipartfest.com/925898b903a4d9182622fda48f870f66_welcome-to-our-room-with-a-twitter-logo-clipart-png_1139-926.png" height="50"/>
                </div>
                <TweeterFeeds/>
            </div>
		)

	}
}

class TweeterFeeds extends React.Component {

	constructor(props) {
		super(props);
		this.state = {tweets: [], attributes: []}; 
		this.fetchTweets = this.fetchTweets.bind(this);
		this.fetchOptusTweets = this.fetchOptusTweets.bind(this);
		this.fetchSingtelTweets = this.fetchSingtelTweets.bind(this);
	}
    
    componentDidMount() {    
        this.fetchTweets("Optus");
    }
    
    fetchOptusTweets() {
        this.fetchTweets('Optus');
    }
    fetchSingtelTweets() {
        this.fetchTweets('Singtel');
    }
    
    
    fetchTweets(username) {
        var that = this;
		fetch("/tweeter?user="+username)
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
            that.setState({ tweets: tweets });
		});
    }
    
	render() {
		return (
			<div>
                <button type="button" onClick={this.fetchOptusTweets}>@Optus</button> | <button type="button" onClick={this.fetchSingtelTweets}>@Singtel</button>
                <br/>
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
                        <td><img src={tweet.profileImageUrl}/></td>
                        <td>{tweet.text}</td>
                    </tr>
                )
            });
		}
		return (
			<div>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Text</th>
						</tr>
					</thead>
                    <tbody>
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
