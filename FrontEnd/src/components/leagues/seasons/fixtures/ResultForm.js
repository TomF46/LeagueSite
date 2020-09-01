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
    <div className="container-fluid">
      <div className="row">
        <form onSubmit={onSave}>
          <div className="col">
            <h2>Add Result</h2>
            {errors.onSave && (
              <div className="alert alert-danger" role="alert">
                {errors.onSave}
              </div>
            )}
          </div>
          <div className="col-6">
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
              className="btn btn-primary"
              onClick={() => onAddHomeGoalClick()}
            >
              Add home goal
            </button>
          </div>
          <div className="col-6">
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
              className="btn btn-primary"
              onClick={() => onAddAwayGoalClick()}
            >
              Add away goal
            </button>
          </div>
          <div className="col">
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
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
