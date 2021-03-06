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

  formatDate(date) {
    let currentTime = new Date(date);
    let year = currentTime.getFullYear();
    let month = currentTime.getMonth() + 1;
    let day = currentTime.getDate();
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();
    let second = currentTime.getSeconds();
    if (month.toString().length === 1) {
      month = "0" + month;
    }
    if (day.toString().length === 1) {
      day = "0" + day;
    }
    if (hour.toString().length === 1) {
      hour = "0" + hour;
    }
    if (minute.toString().length === 1) {
      minute = "0" + minute;
    }
    if (second.toString().length === 1) {
      second = "0" + second;
    }
    let dateTime =
      year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
    return dateTime;
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
                <p className="current-date">
                  POSTED: {this.formatDate(post.date)}
                </p>
              </div>
              <div className="post-right">
                <p>{post.text} </p>
              </div>
            </div>
            {showActions ? (
              <div className="post-buttons">
                <span>
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
                </span>
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
