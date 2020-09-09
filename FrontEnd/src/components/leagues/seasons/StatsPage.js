import React, { useEffect, useState } from "react";
import * as SeasonApi from "../../../api/seasonApi";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import TopGoalScorerTable from "./TopGoalScorerTable";

const StatsPage = ({ seasonId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!stats) {
      SeasonApi.getStatsForSeasonById(seasonId)
        .then((statData) => {
          setStats(statData);
        })
        .catch((error) => {
          console.log("Error getting the league stat data " + error);
        });
    }
  }, [seasonId, stats]);

  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Leagues</h1>
          </div>
        </div>
      </section>
      {!stats ? (
        <Spinner />
      ) : (
        <>
          <div className="box">
            <p>Matches complete: {stats.matchesPlayed}</p>
            <p>Total goals: {stats.goalsScored}</p>
            <p>Goals with known scorer: {stats.goalsScoredByUnknown}</p>
          </div>
          <TopGoalScorerTable scorers={stats.topGoalScorers} />
        </>
      )}
    </>
  );
};

StatsPage.propTypes = {
  seasonId: PropTypes.any.isRequired,
  leagueId: PropTypes.any.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const seasonId = ownProps.match.params.seasonId;
  const leagueId = ownProps.match.params.leagueId;
  return {
    seasonId,
    leagueId,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
