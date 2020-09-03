import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { newPlayer } from "../../../../../tools/mockData";
import { loadPlayers } from "../../../../redux/actions/playerActions";
import PropTypes from "prop-types";
import Spinner from "../../../common/Spinner";
import PlayerDetail from "./PlayerDetail";

const PlayerPage = ({
  history,
  players,
  loadPlayers,
  squadId,
  clubId,
  userIsAuthenticated,
  ...props
}) => {
  const [player, setPlayer] = useState({ ...props.player });

  useEffect(() => {
    if (players.length === 0) {
      loadPlayers().catch((err) => {
        alert("Loading players failed, " + err);
      });
    } else {
      setPlayer({ ...props.player });
    }
  }, [props.player]);

  return players.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <>
        <h1 className="title is-1">
          {player.displayName}
          {userIsAuthenticated && (
            <span
              className="icon has-text-primary is-medium ml-4 pointer"
              onClick={() =>
                history.push(
                  `/club/${clubId}/squad/${squadId}/player/${player.id}/edit`
                )
              }
            >
              <ion-icon name="pencil-outline"></ion-icon>
            </span>
          )}
        </h1>
        <PlayerDetail player={player} />
      </>
    </>
  );
};

PlayerPage.propTypes = {
  player: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  loadPlayers: PropTypes.func.isRequired,
  squadId: PropTypes.any.isRequired,
  clubId: PropTypes.any.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,

  history: PropTypes.object.isRequired,
};

const getPlayerById = (players, id) => {
  return players.find((player) => player.id == id) || null;
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.playerId;
  const player =
    id && state.players.length > 0
      ? getPlayerById(state.players, id)
      : newPlayer;
  const squadId = ownProps.match.params.squadId;
  const clubId = ownProps.match.params.clubId;

  return {
    clubId,
    squadId,
    player,
    players: state.players,
    userIsAuthenticated: state.user != null,
  };
};

const mapDispatchToProps = {
  loadPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
