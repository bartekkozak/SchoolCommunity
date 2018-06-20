import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
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
    const { comment, postId, auth } = this.props;

    return (
      <div className="post-item">
        <div>
          <div className="post-content comments">
            <div className="post-lr-wrapper">
              <div className="post-left">
                <img src={comment.avatar} alt="" />
                <p>{comment.name} </p>
                <p className="current-date">
                  COMMENTED: {this.formatDate(comment.date)}
                </p>
              </div>
              <div className="post-right">
                <p>{comment.text}</p>
              </div>
            </div>

            {comment.user === auth.user.id ? (
              <div className="comment-button">
                <button
                  onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                  type="button"
                  className="button delete-button"
                >
                  <i className="fas fa-times" /> Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
