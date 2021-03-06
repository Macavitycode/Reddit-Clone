import React from "react";
import Navbar from "./Navbar";
import PostCard from "./components/SubReddit/PostCard";
import SubInfo from "./components/SubReddit/SubInfo";
import "./styles.css";
import { hidden } from "./Hidden";
const RedditAPI = require("reddit-wrapper-v2");

export const redditconn = RedditAPI({
  username: hidden.username,
  password: hidden.password,
  app_id: hidden.app_id,
  api_secret: hidden.api_secret,
  retry_on_wait: true,
  retry_on_server_error: 5,
  retry_delay: 1,
  logs: true
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: ""
    };
  }

  componentDidMount() {
    redditconn.api.get("/r/funny/about", {}).then(data => {
      console.log("Subreddit", data[1].data);
      this.setState({
        desc: data[1].data.public_description,
        icon: data[1].data.community_icon,
        subreddit: data[1].data.title,
        subs: data[1].data.subscribers
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="post-wrapper">
          <div className="column-1">
            <PostCard key="test" />
          </div>
          <div className="column-2">
            <SubInfo
              subs={this.state.subs}
              heading="About Community"
              content={this.state.desc}
              icon={this.state.icon}
              subreddit={this.state.subreddit}
            />
          </div>
        </div>
      </div>
    );
  }
}
