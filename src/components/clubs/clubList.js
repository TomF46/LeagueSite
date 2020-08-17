import React from "react";
import PropTypes from "prop-types";

const ClubList = ({ clubs }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Location</th>
      </tr>
    </thead>
    <tbody>
      {clubs.map((club) => {
        return (
          <tr key={club.id}>
            <td>{club.name}</td>
            <td>{club.location}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

ClubList.propTypes = {
  clubs: PropTypes.array.isRequired,
};

export default ClubList;
