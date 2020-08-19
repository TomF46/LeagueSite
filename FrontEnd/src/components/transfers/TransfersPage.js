import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadTransfers } from "../../redux/actions/transferActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import TransferList from "./transferList";

const TransfersPage = ({ transfers, loading, loadTransfers }) => {
  useEffect(() => {
    if (transfers.length === 0) {
      loadTransfers()
        .then((res) => {
          console.log(transfers);
        })
        .catch((error) => {
          alert("Loading transfers failed " + error);
        });
    }
  }, [transfers]);

  return (
    <>
      <h2>Transfers</h2>
      {loading ? <Spinner /> : <TransferList transfers={transfers} />}
    </>
  );
};

TransfersPage.propTypes = {
  transfers: PropTypes.array.isRequired,
  loadTransfers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    transfers: state.transfers,
    loading: state.apiCallsInProgrss > 0,
  };
};

const mapDispatchToProps = {
  loadTransfers,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransfersPage);
