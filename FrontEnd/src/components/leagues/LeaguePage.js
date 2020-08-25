import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadLeagues } from "../../redux/actions/leagueActions";
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
const LeaguePage = ({
  leagues,
  squads,
  leagueSquads,
  loadLeagues,
  loadSquads,
  addSquadToLeague,
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

  return leagues.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <>
        <h1>{league.name}</h1>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-league"
          onClick={() => history.push(`/league/${league.id}/edit`)}
        >
          Edit {league.name}
        </button>
        <LeagueDetail league={league} />

        {squads.length > 0 && <ParticipantList participants={leagueSquads} />}
        <AddTeamForm
          squads={squads}
          leagueAddition={leagueAddition}
          errors={errors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
        />
      </>
    </>
  );
};

LeaguePage.propTypes = {
  league: PropTypes.object.isRequired,
  leagues: PropTypes.array.isRequired,
  squads: PropTypes.array.isRequired,
  leagueSquads: PropTypes.array.isRequired,
  loadLeagues: PropTypes.func.isRequired,
  loadSquads: PropTypes.func.isRequired,
  deleteSquad: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const getLeagueById = (leagues, id) => {
  return leagues.find((storedLeague) => storedLeague.id == id) || null;
};

const getLeagueSquads = (squads, league) => {
  return squads.filter((storedSquad) => storedSquad.leagueId == league.id);
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const league =
    id && state.leagues.length > 0
      ? getLeagueById(state.leagues, id)
      : newLeague;
  const leagueSquads =
    state.squads.length > 0 ? getLeagueSquads(state.squads, league) : [];
  return {
    league,
    leagueSquads,
    leagues: state.leagues,
    squads: state.squads,
  };
};

const mapDispatchToProps = {
  loadLeagues,
  loadSquads,
  deleteSquad,
  addSquadToLeague,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaguePage);
