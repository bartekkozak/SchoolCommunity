import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div>
        <img src={comment.avatar} alt="" />
        <p>{comment.name}</p>

        <p>{comment.text} </p>

        {comment.user === auth.user.id ? (
          <button
            onClick={this.onDeleteClick.bind(this, postId, comment._id)}
            type="button"
            className="button"
          >
            <i className="fas fa-times" /> Delete
          </button>
        ) : null}
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
