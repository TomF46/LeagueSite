import React, { useEffect, useState } from "react";
import * as FixtureApi from "../../../../api/fixtureApi";
import * as ResultApi from "../../../../api/resultApi";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../../common/Spinner";
import FixtureDetail from "./FixtureDetail";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

const FixturePage = ({
  id,
  leagueId,
  seasonId,
  userIsAuthenticated,
  history,
}) => {
  const [fixture, setFixture] = useState(null);

  useEffect(() => {
    if (!fixture) {
      FixtureApi.getFixtureById(id)
        .then((fixtureData) => {
          setFixture(fixtureData);
        })
        .catch((error) => {
          console.log("Error getting the fixture data " + error);
        });
    }
  }, [id, fixture]);

  const handleRemoveResult = (fixture) => {
    confirmAlert({
      title: "Confirm removal",
      message: `Are you sure you want to remove this result?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => removeResult(fixture),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  function removeResult(fixture) {
    //Premptivley chance view
    setFixture({
      fixtureId: fixture.id,
      homeScore: 0,
      awayScore: 0,
      complete: false,
    });
    toast.success("Result removed");
    ResultApi.deleteResult(fixture)
      .then(() => {
        FixtureApi.getFixtureById(id)
          .then((fixtureData) => {
            setFixture(fixtureData);
          })
          .catch((error) => {
            console.log("Error getting the fixture data " + error);
            toast.error("Failed to remove");
          });
      })
      .catch((err) => {
        console.log("Unable to remove result " + err);
      });
  }

  return !fixture ? (
    <Spinner />
  ) : (
    <>
      <FixtureDetail fixture={fixture} />
      {userIsAuthenticated && (
        <>
          {fixture.complete ? (
            <button
              style={{ marginBottom: 20 }}
              className="button is-primary remove-result"
              onClick={() => handleRemoveResult(fixture)}
            >
              Remove result
            </button>
          ) : (
            <button
              style={{ marginBottom: 20 }}
              className="button is-primary edit-result"
              onClick={() =>
                history.push(
                  `/league/${leagueId}/season/${seasonId}/fixture/${id}/result`
                )
              }
            >
              Add result
            </button>
          )}
        </>
      )}
    </>
  );
};

FixturePage.propTypes = {
  id: PropTypes.any.isRequired,
  leagueId: PropTypes.any.isRequired,
  seasonId: PropTypes.any.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const seasonId = ownProps.match.params.seasonId;
  const leagueId = ownProps.match.params.leagueId;
  return {
    id,
    leagueId,
    seasonId,
    userIsAuthenticated: state.user != null,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FixturePage);
