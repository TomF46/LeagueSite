import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import * as clubActions from "../../redux/actions/clubActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ClubList from "./clubList";

const ClubsPage = ({ clubs, actions, loading }) => {
  useEffect(() => {
    if (clubs.length === 0) {
      actions.loadClubs().catch((error) => {
        alert("Loading clubs failed " + error);
      });
    }
  }, [clubs]);

  return (
    <>
      <h2>Clubs</h2>
      {loading ? <Spinner /> : <ClubList clubs={clubs} />}
    </>
  );
};

ClubsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  clubs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    clubs: state.clubs,
    loading: state.apiCallsInProgrss > 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadClubs: bindActionCreators(clubActions.loadClubs, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClubsPage);
