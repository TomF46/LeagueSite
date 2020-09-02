import React from "react";
import PropTypes from "prop-types";
import PlayerSelect from "../../../common/PlayerSelect";

const ResultForm = ({
  result,
  onSave,
  onChange,
  saving = false,
  errors = {},
  onAddHomeGoalClick,
  onAddAwayGoalClick,
  squads,
}) => {
  return (
    <div className="container">
      <form onSubmit={onSave} className="columns">
        <div className="column">
          <h2 className="title is-2 has-text-centered">Add Result</h2>
          {errors.onSave && (
            <div className="help is-danger" role="alert">
              {errors.onSave}
            </div>
          )}
          <div className="box">
            <div className="columns">
              <div className="column">
                <table className="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th className="has-text-right">{`${squads.home.name} ${result.homeScore}`}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.homeGoalScorers.map((scorer, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ textAlign: "right" }}>
                            <PlayerSelect
                              name="playerId"
                              label="Player"
                              side="home"
                              index={index}
                              value={scorer.playerId}
                              defaultOption="Unknown Player"
                              options={squads.home.squad.map((player) => ({
                                value: player.id,
                                text: player.displayName,
                              }))}
                              onChange={onChange}
                              error={errors.player}
                            />
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>
                        <button
                          className="button is-primary is-pulled-right"
                          onClick={() => onAddHomeGoalClick()}
                        >
                          Add home goal
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="column">
                <table className="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th>{`${squads.away.name} ${result.awayScore}`}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.awayGoalScorers.map((scorer, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <PlayerSelect
                              name="playerId"
                              label="Player"
                              side="away"
                              index={index}
                              value={scorer.playerId}
                              defaultOption="Unknown Player"
                              options={squads.away.squad.map((player) => ({
                                value: player.id,
                                text: player.displayName,
                              }))}
                              onChange={onChange}
                              error={errors.player}
                            />
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>
                        <button
                          className="button is-primary"
                          onClick={() => onAddAwayGoalClick()}
                        >
                          Add away goal
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="has-text-centered">
            <button
              type="submit"
              disabled={saving}
              className="button is-primary has-text-centered"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
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
  squads: PropTypes.object.isRequired,
  onAddHomeGoalClick: PropTypes.func.isRequired,
  onAddAwayGoalClick: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ResultForm;
