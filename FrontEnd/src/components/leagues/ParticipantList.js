import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ParticipantList = ({
  participants,
  onDeleteClick,
  userIsAuthenticated,
}) => (
  <div className="my-4">
    <div className="box">
      <h3 className="title is-3">Participants</h3>
      <div className="table-container">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => {
              return (
                <tr key={participant.id}>
                  <td>
                    <Link
                      to={`/club/${participant.clubId}/squad/${participant.id}`}
                    >
                      {`${participant.clubName} ${participant.name}`}
                    </Link>
                  </td>
                  <td>
                    {userIsAuthenticated && (
                      <button
                        className="delete is-large is-pulled-right"
                        onClick={() => onDeleteClick(participant)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

ParticipantList.propTypes = {
  participants: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
};

export default ParticipantList;
