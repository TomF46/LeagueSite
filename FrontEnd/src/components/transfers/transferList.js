import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const TransferList = ({ transfers }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>From</th>
        <th>To</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {transfers.map((transfer) => {
        return (
          <tr key={transfer.id}>
            <td>{transfer.playerDisplayName}</td>
            <td>{transfer.fromSquadDisplayName}</td>
            <td>{transfer.toSquadDisplayName}</td>
            <td>
              <Moment format="DD/MM/YYYY">{transfer.dateCreated}</Moment>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

TransferList.propTypes = {
  transfers: PropTypes.array.isRequired,
};

export default TransferList;
