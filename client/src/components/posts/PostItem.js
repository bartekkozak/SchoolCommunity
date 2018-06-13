import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="post-item">
        <div>
          <div className="post-content">
            <div className="post-lr-wrapper">
              <div className="post-left">
                <img src={post.avatar} alt="" />
                <p>{post.name} </p>
              </div>
              <div className="post-right">
                <p>{post.text} </p>
              </div>
            </div>
            {showActions ? (
              <div className="post-buttons">
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="button button-like"
                >
                  <i className="fas fa-thumbs-up" />
                  <span> {post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="button button-dislike"
                >
                  <i className="fas fa-thumbs-down" />
                </button>

                <Link to={`/post/${post._id}`}>
                  <button className="button">Comments</button>
                </Link>

                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="button remove-button"
                  >
                    {" "}
                    <i class="fas fa-trash-alt" />
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

PostItem.defaultProps = {
  showActions: true
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
