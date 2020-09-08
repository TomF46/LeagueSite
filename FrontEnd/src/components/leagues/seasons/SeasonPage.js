import React, { useEffect, useState } from "react";
import * as SeasonApi from "../../../api/seasonApi";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import FixtureList from "./fixtures/FixtureList";

const SeasonPage = ({ id, userIsAuthenticated, history }) => {
  const [season, setSeason] = useState(null);

  useEffect(() => {
    if (!season) {
      SeasonApi.getSeasonById(id)
        .then((seasonData) => {
          setSeason(seasonData);
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
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {season.leagueName} - {season.name}
              {userIsAuthenticated && (
                <span
                  className="icon has-text-primary is-medium ml-4 pointer"
                  onClick={() =>
                    history.push(
                      `/league/${season.leagueId}/season/${season.id}/edit`
                    )
                  }
                >
                  <ion-icon name="pencil-outline"></ion-icon>
                </span>
              )}
            </h1>
          </div>
        </div>
      </section>
      <button
        style={{ marginBottom: 20 }}
        className="button is-primary my-4 view-table"
        onClick={() =>
          history.push(`/league/${season.leagueId}/season/${season.id}/table`)
        }
      >
        View league table
      </button>
      {season.fixtures.length > 0 && <FixtureList fixtures={season.fixtures} />}
    </>
  );
};

SeasonPage.propTypes = {
  id: PropTypes.any.isRequired,
  leagueId: PropTypes.any.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const leagueId = ownProps.match.params.leagueId;
  return {
    id,
    leagueId,
    userIsAuthenticated: state.user != null,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonPage);
