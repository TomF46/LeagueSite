import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadLeagues } from "../../redux/actions/leagueActions";
import { loadSeasons, deleteSeason } from "../../redux/actions/seasonActions";

import {
  loadSquads,
  deleteSquad,
  addSquadToLeague,
} from "../../redux/actions/squadActions";
import { newLeague, newLeageAddition } from "../../../tools/mockData";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import LeagueDetail from "./LeagueDetail";
import ParticipantList from "./ParticipantList";
import AddTeamForm from "./AddTeamForm";
import { toast } from "react-toastify";
import SeasonList from "./seasons/SeasonList";
import { confirmAlert } from "react-confirm-alert";
const LeaguePage = ({
  leagues,
  squads,
  leagueSquads,
  loadLeagues,
  loadSquads,
  addSquadToLeague,
  seasons,
  leagueSeasons,
  loadSeasons,
  userIsAuthenticated,
  deleteSeason,
  history,
  ...props
}) => {
  const [league, setLeague] = useState({ ...props.league });
  const [leagueAddition, setLeagueAddition] = useState({ ...newLeageAddition });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (leagues.length === 0) {
      loadLeagues().catch((err) => {
        alert("Loading leagues failed, " + err);
      });
    } else {
      setLeague({ ...props.league });
    }
  }, [props.league]);

  useEffect(() => {
    if (squads.length === 0) {
      loadSquads().catch((err) => {
        alert("Loading squads failed, " + err);
      });
    }
  }, [props.squads]);

  useEffect(() => {
    if (seasons.length === 0) {
      loadSeasons().catch((err) => {
        alert("Loading seasons failed, " + err);
      });
    }
  }, [props.seasons]);

  function handleChange(event) {
    const { name, value } = event.target;
    setLeagueAddition((prevLeagueAddition) => ({
      ...prevLeagueAddition,
      [name]: parseInt(value, 10),
    }));
  }

  function formIsValid() {
    const { squadId } = leagueAddition;
    const errors = {};
    if (!squadId) errors.player = "Team name is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    var request = {
      leagueId: league.id,
      squadId: leagueAddition.squadId,
    };

    setSaving(true);
    addSquadToLeague(request)
      .then(() => {
        loadLeagues().catch((error) => {
          alert("Loading leagues failed " + error);
        });
        loadSquads().catch((error) => {
          alert("Loading leagues failed " + error);
        });
        toast.success("Team added.");
        setSaving(false);
        history.push(`/league/${league.id}`);
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  const handleDeleteSeason = (season) => {
    confirmAlert({
      title: "Confirm deletion",
      message: `Are you sure you want to delete ${season.name}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => removeSeason(season),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const removeSeason = async (season) => {
    toast.success("Season deleted");
    try {
      await deleteSeason(season);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return leagues.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <>
        <h1 className="title is-1">
          {league.name}
          {userIsAuthenticated && (
            <span
              className="icon has-text-primary is-medium ml-4 pointer"
              onClick={() => history.push(`/league/${league.id}/edit`)}
            >
              <ion-icon name="pencil-outline"></ion-icon>
            </span>
          )}
        </h1>
        <LeagueDetail league={league} />

        {leagueSquads.length > 0 ? (
          <ParticipantList participants={leagueSquads} />
        ) : (
          <div className="my-4">
            <h3 className="title is-3">Participants</h3>
            <p>There are currently no participants in this league league.</p>
            {userIsAuthenticated && <p>Please add one using the form below.</p>}
          </div>
        )}

        {userIsAuthenticated && (
          <AddTeamForm
            squads={squads}
            leagueAddition={leagueAddition}
            errors={errors}
            onChange={handleChange}
            onSave={handleSave}
            saving={saving}
          />
        )}
        {leagueSeasons.length > 0 ? (
          <SeasonList
            seasons={leagueSeasons}
            onDeleteClick={handleDeleteSeason}
            userIsAuthenticated={userIsAuthenticated}
          />
        ) : (
          <div className="my-4">
            <h3 className="title is-3">Seasons</h3>
            <p>There are currently no seasons available for this league.</p>
            {userIsAuthenticated && (
              <p>Please add one using the add season button.</p>
            )}
          </div>
        )}

        {userIsAuthenticated && (
          <button
            style={{ marginBottom: 20 }}
            className="button is-primary add-season is-pulled-right"
            onClick={() => history.push(`/league/${league.id}/season`)}
          >
            Add season
          </button>
        )}
      </>
    </>
  );
};

LeaguePage.propTypes = {
  league: PropTypes.object.isRequired,
  leagues: PropTypes.array.isRequired,
  squads: PropTypes.array.isRequired,
  leagueSquads: PropTypes.array.isRequired,
  seasons: PropTypes.array.isRequired,
  leagueSeasons: PropTypes.array.isRequired,
  loadLeagues: PropTypes.func.isRequired,
  loadSquads: PropTypes.func.isRequired,
  loadSeasons: PropTypes.func.isRequired,
  deleteSquad: PropTypes.func.isRequired,
  deleteSeason: PropTypes.func.isRequired,
  addSquadToLeague: PropTypes.func.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const getLeagueById = (leagues, id) => {
  return leagues.find((storedLeague) => storedLeague.id == id) || null;
};

const getLeagueSquads = (squads, league) => {
  return squads.filter((storedSquad) => storedSquad.leagueId == league.id);
};

const getLeagueSeasons = (seasons, league) => {
  return seasons.filter((storedSeason) => storedSeason.leagueId == league.id);
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const league =
    id && state.leagues.length > 0
      ? getLeagueById(state.leagues, id)
      : newLeague;
  const leagueSquads =
    state.squads.length > 0 ? getLeagueSquads(state.squads, league) : [];
  const leagueSeasons =
    state.seasons.length > 0 ? getLeagueSeasons(state.seasons, league) : [];
  return {
    league,
    leagueSquads,
    leagueSeasons,
    leagues: state.leagues,
    squads: state.squads,
    seasons: state.seasons,
    userIsAuthenticated: state.user != null,
  };
};

const mapDispatchToProps = {
  loadLeagues,
  loadSquads,
  deleteSquad,
  addSquadToLeague,
  loadSeasons,
  deleteSeason,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaguePage);
