import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import * as clubActions from "../../redux/actions/clubActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ClubList from "./ClubList";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

const ClubsPage = ({
  clubs,
  actions,
  loading,
  userIsAuthenticated,
  history,
}) => {
  useEffect(() => {
    if (clubs.length === 0) {
      actions.loadClubs().catch((error) => {
        alert("Loading clubs failed " + error);
      });
    }
  }, [clubs]);

  const handleDeleteClub = (club) => {
    confirmAlert({
      title: "Confirm deletion",
      message: `Are you sure you want to delete ${club.name}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteClub(club),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteClub = async (club) => {
    toast.success("Club deleted");
    try {
      await actions.deleteClub(club);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <>
      <h2 className="title is-2">Clubs</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ClubList
            clubs={clubs}
            onDeleteClick={handleDeleteClub}
            userIsAuthenticated={userIsAuthenticated}
          />
          {userIsAuthenticated && (
            <button
              style={{ marginBottom: 20 }}
              className="button is-primary add-club is-pulled-right"
              onClick={() => history.push("/club")}
            >
              Add Club
            </button>
          )}
        </>
      )}
    </>
  );
};

ClubsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  clubs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    clubs: state.clubs,
    loading: state.apiCallsInProgress > 0,
    userIsAuthenticated: state.user != null,
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
