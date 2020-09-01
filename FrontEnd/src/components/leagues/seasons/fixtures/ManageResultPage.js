import React, { useEffect, useState } from "react";
import * as FixtureApi from "../../../../api/fixtureApi";
import * as ResultApi from "../../../../api/resultApi";
import { loadPlayers } from "../../../../redux/actions/playerActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../../common/Spinner";
import { toast } from "react-toastify";
import ResultForm from "./ResultForm";
import { newResult } from "../../../../../tools/mockData";

const FixturePage = ({
  id,
  leagueId,
  seasonId,
  players,
  history,
  loadPlayers,
  ...props
}) => {
  const [fixture, setFixture] = useState(null);
  const [result, setResult] = useState({ ...props.result });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [homeTeamPlayers, setHomeTeamPlayers] = useState([]);
  const [awayTeamPlayers, setAwayTeamPlayers] = useState([]);

  useEffect(() => {
    if (!fixture) {
      FixtureApi.getFixtureById(id)
        .then((fixtureData) => {
          setFixture(fixtureData);
          setResult({
            fixtureId: fixtureData.id,
            homeScore: fixtureData.homeScore,
            awayScore: fixtureData.awayScore,
            homeGoalScorers: fixtureData.homeGoalScorers,
            awayGoalScorers: fixtureData.awayGoalScorers,
          });
          if (players.length > 0) setPlayers();
        })
        .catch((error) => {
          console.log("Error getting the fixture data " + error);
        });
    } else {
      if (players.length > 0) setPlayers();
    }
  }, [id, fixture]);

  useEffect(() => {
    if (players.length === 0) {
      loadPlayers().catch((err) => {
        alert("Loading players failed, " + err);
      });
    } else {
      if (fixture) setPlayers();
    }
  }, [players]);

  function setPlayers() {
    console.log(players);
    let unknownPlayer = { id: null, displayName: "Unknown" };
    let homePlayers = players.filter(
      (player) => player.squadId == fixture.homeTeamId
    );
    homePlayers.push(unknownPlayer);
    setHomeTeamPlayers(homePlayers);
    let awayPlayers = players.filter(
      (player) => player.squadId == fixture.awayTeamId
    );
    awayPlayers.push(unknownPlayer);
    setAwayTeamPlayers(awayPlayers);
  }

  function handleChange(event) {
    let side = event.target.getAttribute("side");
    let index = event.target.getAttribute("index");

    let newResult = { ...result };

    let value = parseInt(event.target.value, 10);

    if (side == "home") {
      newResult.homeGoalScorers[index].playerId = value;
    } else {
      newResult.awayGoalScorers[index].playerId = value;
    }

    console.log(newResult);
    setResult(newResult);
  }

  function formIsValid() {
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    var resultToSend = { ...result };

    resultToSend.homeGoalScorers = resultToSend.homeGoalScorers.filter(
      (scorer) => scorer.playerId != null && !isNaN(scorer.playerId)
    );
    resultToSend.awayGoalScorers = resultToSend.awayGoalScorers.filter(
      (scorer) => scorer.playerId != null && !isNaN(scorer.playerId)
    );

    setSaving(true);
    ResultApi.saveResult(resultToSend)
      .then(() => {
        toast.success("Result saved");
        history.push(
          `/league/${leagueId}/season/${seasonId}/fixture/${resultToSend.fixtureId}`
        );
      })
      .catch((err) => {
        setSaving(false);
        setErrors({ onSave: err.message });
      });
  }

  function handleAddHomeGoal() {
    event.preventDefault();
    var newResult = { ...result };
    newResult.homeGoalScorers.push({ playerId: null });
    newResult.homeScore++;
    setResult(newResult);
  }

  function handleAddAwayGoal() {
    event.preventDefault();
    var newResult = { ...result };
    newResult.awayGoalScorers.push({ playerId: null });
    newResult.awayScore++;
    setResult(newResult);
  }

  return !fixture ? (
    <Spinner />
  ) : (
    <>
      <ResultForm
        result={result}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
        homeTeamPlayers={homeTeamPlayers}
        awayTeamPlayers={awayTeamPlayers}
        onAddAwayGoalClick={handleAddAwayGoal}
        onAddHomeGoalClick={handleAddHomeGoal}
      />
    </>
  );
};

FixturePage.propTypes = {
  result: PropTypes.object.isRequired,
  id: PropTypes.any.isRequired,
  leagueId: PropTypes.any.isRequired,
  seasonId: PropTypes.any.isRequired,
  history: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  loadPlayers: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const seasonId = ownProps.match.params.seasonId;
  const leagueId = ownProps.match.params.leagueId;
  const result = newResult;
  const players = state.players;
  return {
    id,
    leagueId,
    seasonId,
    result,
    players,
  };
};

const mapDispatchToProps = {
  loadPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(FixturePage);
