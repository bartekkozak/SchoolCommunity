import React from "react";

const Book = ({ front, inside }) => {
  return (
    <div className="profile-book">
      <div className="book-front">{front}</div>
      <div className="book-details">{inside}</div>
    </div>
  );
};

export default Book;
