import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../actions/postActions";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <p className="load-content">Loading...</p>;
    } else {
      postContent = (
        <div className="post-container">
          <div className="post-wrapper">
            <p className="create-profile-text">Make a comment</p>
            <Link to="/posts">
              <button className="button">Previous</button>
            </Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <CommentFeed postId={post._id} comments={post.comments} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="post ">
          <p className="post-header">POST</p>
          {postContent}
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
