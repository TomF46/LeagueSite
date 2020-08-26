import React, { useEffect, useState } from "react";
import * as SeasonApi from "../../../api/seasonApi";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import { toast } from "react-toastify";
import FixtureList from "./fixtures/FixtureList";

const SeasonPage = ({ id, leagueId, history, ...props }) => {
  const [season, setSeason] = useState(null);

  useEffect(() => {
    if (!season) {
      SeasonApi.getSeasonById(id)
        .then((seasonData) => {
          setSeason(seasonData);
          console.log(season);
        })
        .catch((error) => {
          console.log("Error getting the season data " + error);
        });
    }
  }, [id, season]);

  return !season ? (
    <Spinner />
  ) : (
    <>
      <h2>
        {season.leagueName} - {season.name}
      </h2>
      <button
        style={{ marginBottom: 20 }}
        className="btn btn-primary edit season"
        onClick={() =>
          history.push(`/league/${season.leagueId}/season/${season.id}/edit`)
        }
      >
        Edit season
      </button>
      {season.fixtures.length > 0 && <FixtureList fixtures={season.fixtures} />}
    </>
  );
};

SeasonPage.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const leagueId = ownProps.match.params.leagueId;
  return {
    id,
    leagueId,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonPage);
