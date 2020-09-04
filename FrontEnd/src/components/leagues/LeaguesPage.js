import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import LeagueList from "./LeagueList";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { deleteLeague, loadLeagues } from "../../redux/actions/leagueActions";

const LeaguesPage = ({
  leagues,
  loading,
  userIsAuthenticated,
  loadLeagues,
  deleteLeague,
  history,
}) => {
  useEffect(() => {
    if (leagues.length === 0) {
      loadLeagues().catch((error) => {
        alert("Loading leagues failed " + error);
      });
    }
  }, [leagues]);

  const handleDeleteLeague = (league) => {
    confirmAlert({
      title: "Confirm deletion",
      message: `Are you sure you want to delete ${league.name}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => removeLeague(league),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const removeLeague = async (league) => {
    toast.success("League deleted");
    try {
      await deleteLeague(league);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <>
      <h2 className="title is-2">Leagues</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <LeagueList
            leagues={leagues}
            onDeleteClick={handleDeleteLeague}
            userIsAuthenticated={userIsAuthenticated}
          />
          {userIsAuthenticated && (
            <button
              style={{ marginBottom: 20 }}
              className="button is-primary add-league is-pulled-right"
              onClick={() => history.push("/league")}
            >
              Add League
            </button>
          )}
        </>
      )}
    </>
  );
};

LeaguesPage.propTypes = {
  leagues: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
  loadLeagues: PropTypes.func.isRequired,
  deleteLeague: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    leagues: state.leagues,
    loading: state.apiCallsInProgress > 0,
    userIsAuthenticated: state.user != null,
  };
};

const mapDispatchToProps = {
  loadLeagues,
  deleteLeague,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaguesPage);
