import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import * as clubActions from "../../redux/actions/clubActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ClubList from "./clubList";
import { toast } from "react-toastify";

const ClubsPage = ({ clubs, actions, loading, history }) => {
  useEffect(() => {
    if (clubs.length === 0) {
      actions.loadClubs().catch((error) => {
        alert("Loading clubs failed " + error);
      });
    }
  }, [clubs]);

  const handleDeleteClub = async (club) => {
    toast.success("Club deleted");
    try {
      await actions.deleteClub(club);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <>
      <h2>Clubs</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-club"
            onClick={() => history.push("/club")}
          >
            Add Club
          </button>
          <ClubList clubs={clubs} onDeleteClick={handleDeleteClub} />
        </>
      )}
    </>
  );
};

ClubsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  clubs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
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
      deleteClub: bindActionCreators(clubActions.deleteClub, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClubsPage);
