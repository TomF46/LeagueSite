import React from "react";
import PropTypes from "prop-types";

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
            <td>{transfer.playerName}</td>
            <td>{transfer.fromTeamName}</td>
            <td>{transfer.toTeamName}</td>
            <td></td>
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
