import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadTransfers } from "../../redux/actions/transferActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import TransferList from "./TransferList";

const TransfersPage = ({ transfers, loading, loadTransfers, history }) => {
  useEffect(() => {
    if (transfers.length === 0) {
      loadTransfers().catch((error) => {
        alert("Loading transfers failed " + error);
      });
    }
  }, [transfers]);

  return (
    <>
      <h2>Transfers</h2>
      <button
        style={{ marginBottom: 20 }}
        className="btn btn-primary add-transfer"
        onClick={() => history.push("/transfer")}
      >
        Add Transfer
      </button>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TransferList transfers={transfers} />
        </>
      )}
    </>
  );
};

TransfersPage.propTypes = {
  transfers: PropTypes.array.isRequired,
  loadTransfers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    transfers: state.transfers,
    loading: state.apiCallsInProgress > 0,
  };
};

const mapDispatchToProps = {
  loadTransfers,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransfersPage);
