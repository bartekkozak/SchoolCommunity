import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import Book from "./Book";
import Moment from "react-moment";

class ProfileAbout extends Component {
  render() {
    const { profile, education } = this.props;

    // get first name and last name
    const firstName = profile.user.name.trim().split(" ")[0];
    // const lastName = profile.user.name.trim().split(" ")[1];
    //
    const hobbies = profile.hobbies.map((skill, index) => (
      <span key={index}>
        <p>- {skill}</p>
      </span>
    ));

    const EducationItem = edu => (
      <span key={edu._id} className="">
        <h1>School: {edu.school} </h1>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </p>

        <p>Degree: {edu.degree}</p>
        <p>Field of Study: {edu.fieldofstudy}</p>
        <p>
          {edu.description === "" ? null : (
            <p>Description: {edu.description} </p>
          )}
        </p>
      </span>
    );

    const hobbiesLimit = hobbies.slice(0, 8);

    const educationItems = education.map(edu => (
      <Book
        front={
          <div>
            <p>Education</p>
            <p>{edu.school}</p>
          </div>
        }
        inside={<div>{EducationItem(edu)}</div>}
      />
    ));

    return (
      <div>
        <div className="books">
          <Book
            front="Subjects"
            inside={
              <span>
                <p>
                  {isEmpty(profile.favouritesubject) ? null : (
                    <span>
                      Favourite Subject: <p>- {profile.favouritesubject}</p>
                    </span>
                  )}{" "}
                </p>
                <p>
                  {isEmpty(profile.dislikedsubject) ? null : (
                    <span>
                      Least Favourite Subject:{" "}
                      <p>- {profile.dislikedsubject}</p>
                    </span>
                  )}{" "}
                </p>
                <p>
                  {isEmpty(profile.favouriteschool) ? null : (
                    <span>
                      Favourite School: <p>- {profile.favouriteschool}</p>
                    </span>
                  )}{" "}
                </p>
              </span>
            }
          />
          <Book front="Hobbies" inside={hobbiesLimit} />
          {/* {isEmpty(lastName) ? null : <h2>Last name: {lastName}</h2>} */}
          <Book
            front={
              <div>
                <p>{`${firstName}'s`}</p>
                <p>Biography</p>
              </div>
            }
            inside={
              <div>
                <p className="lead">
                  {isEmpty(profile.bio) ? (
                    <span>{firstName} Does not have a bio</span>
                  ) : (
                    <p>{profile.bio}</p>
                  )}
                </p>
              </div>
            }
          />
          {educationItems}
        </div>

        <div />
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
