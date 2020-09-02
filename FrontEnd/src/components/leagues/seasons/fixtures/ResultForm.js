import React from "react";
import PropTypes from "prop-types";
import PlayerSelect from "../../../common/PlayerSelect";

const ResultForm = ({
  result,
  onSave,
  onChange,
  saving = false,
  errors = {},
  homeTeamPlayers,
  awayTeamPlayers,
  onAddHomeGoalClick,
  onAddAwayGoalClick,
}) => {
  return (
    <div className="container box">
      <form onSubmit={onSave} className="columns">
        <div className="column">
          <h2 className="title is-2">Add Result</h2>
          <h3 className="title is-2">
            {`${result.homeScore} - ${result.awayScore}`}
          </h3>
          {errors.onSave && (
            <div className="help is-danger" role="alert">
              {errors.onSave}
            </div>
          )}
          <div className="columns">
            <div className="column">
              {result.homeGoalScorers.map((scorer, index) => {
                return (
                  <PlayerSelect
                    key={index}
                    name="playerId"
                    label="Player"
                    side="home"
                    index={index}
                    value={scorer.playerId}
                    defaultOption="Select Player"
                    options={homeTeamPlayers.map((player) => ({
                      value: player.id,
                      text: player.displayName,
                    }))}
                    onChange={onChange}
                    error={errors.player}
                  />
                );
              })}

              <button
                className="button is-primary"
                onClick={() => onAddHomeGoalClick()}
              >
                Add home goal
              </button>
            </div>
            <div className="column">
              {result.awayGoalScorers.map((scorer, index) => {
                return (
                  <PlayerSelect
                    key={index}
                    name="playerId"
                    label="Player"
                    side="away"
                    index={index}
                    value={scorer.playerId}
                    defaultOption="Select Player"
                    options={awayTeamPlayers.map((player) => ({
                      value: player.id,
                      text: player.displayName,
                    }))}
                    onChange={onChange}
                    error={errors.player}
                  />
                );
              })}

              <button
                className="button is-primary"
                onClick={() => onAddAwayGoalClick()}
              >
                Add away goal
              </button>
            </div>
          </div>
          <button type="submit" disabled={saving} className="button is-primary">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

ResultForm.propTypes = {
  result: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  homeTeamPlayers: PropTypes.array.isRequired,
  awayTeamPlayers: PropTypes.array.isRequired,
  onAddHomeGoalClick: PropTypes.func.isRequired,
  onAddAwayGoalClick: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ResultForm;
