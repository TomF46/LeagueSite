import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadTransfers } from "../../redux/actions/transferActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import TransferList from "./TransferList";

const TransfersPage = ({
  transfers,
  loading,
  loadTransfers,
  userIsAuthenticated,
  history,
}) => {
  useEffect(() => {
    if (transfers.length === 0) {
      loadTransfers().catch((error) => {
        alert("Loading transfers failed " + error);
      });
    }
  }, [transfers]);

  return (
    <>
      <h2 className="title is-2">Transfers</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {transfers.length > 0 ? (
            <TransferList transfers={transfers} />
          ) : (
            <div className="my-4">
              <p>There are no transfers available to view.</p>
              {userIsAuthenticated && (
                <p>Please add one using the add transfer button.</p>
              )}
            </div>
          )}
        </>
      )}
      {userIsAuthenticated && (
        <button
          style={{ marginBottom: 20 }}
          className="button is-primary add-transfer is-pulled-right"
          onClick={() => history.push("/transfer")}
        >
          Add Transfer
        </button>
      )}
    </>
  );
};

TransfersPage.propTypes = {
  transfers: PropTypes.array.isRequired,
  loadTransfers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    transfers: state.transfers,
    loading: state.apiCallsInProgress > 0,
    userIsAuthenticated: state.user != null,
  };
};

const mapDispatchToProps = {
  loadTransfers,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransfersPage);
