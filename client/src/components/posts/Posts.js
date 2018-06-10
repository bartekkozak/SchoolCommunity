import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/postActions";
import PostFeed from "./PostFeed";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <p className="load-content">Loading...</p>;
    } else {
      postContent = (
        <div className="posts-container">
          <PostForm />
          <PostFeed posts={posts} />
        </div>
      );
    }

    return (
      <div className="posts">
        <p className="posts-header">POSTS</p>
        {postContent}
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
