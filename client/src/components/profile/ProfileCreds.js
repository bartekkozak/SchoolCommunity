import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { education } = this.props;

    const eduItems = education.map(edu => (
      <li key={edu._id} className="">
        <h1>{edu.school} </h1>

        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </p>

        <p>Degree: {edu.degree} </p>
        <p>Field of Study: {edu.fieldofstudy}</p>
        <p>
          {edu.description === "" ? null : (
            <p>Description: {edu.description} </p>
          )}
        </p>
      </li>
    ));

    return (
      <div>
        <h1>EDUCATION</h1>
        {eduItems.length > 0 ? (
          <ul> {eduItems} </ul>
        ) : (
          <p>No Education listed </p>
        )}
      </div>
    );
  }
}

export default ProfileCreds;
