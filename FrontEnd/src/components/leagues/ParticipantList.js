import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ParticipantList = ({ participants }) => (
  <div className="my-4">
    <h3 className="title is-3">Participants</h3>
    <div className="box">
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

ParticipantList.propTypes = {
  participants: PropTypes.array.isRequired,
};

export default ParticipantList;
