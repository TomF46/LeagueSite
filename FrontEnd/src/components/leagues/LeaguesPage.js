import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import * as leagueActions from "../../redux/actions/leagueActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import LeagueList from "./LeagueList";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

const LeaguesPage = ({ leagues, actions, loading, history }) => {
  useEffect(() => {
    if (leagues.length === 0) {
      actions.loadLeagues().catch((error) => {
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
          onClick: () => deleteLeague(league),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteLeague = async (league) => {
    toast.success("League deleted");
    try {
      await actions.deleteLeague(league);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <>
      <h2>Leagues</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-league"
            onClick={() => history.push("/league")}
          >
            Add League
          </button>
          <LeagueList leagues={leagues} onDeleteClick={handleDeleteLeague} />
        </>
      )}
    </>
  );
};

LeaguesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  leagues: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    leagues: state.leagues,
    loading: state.apiCallsInProgress > 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadLeagues: bindActionCreators(leagueActions.loadLeagues, dispatch),
      deleteLeague: bindActionCreators(leagueActions.deleteLeague, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaguesPage);
