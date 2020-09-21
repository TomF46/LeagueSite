import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { newSquad } from "../../../../tools/mockData";
import { loadSquads } from "../../../redux/actions/squadActions";
import {
  loadPlayers,
  deletePlayer,
} from "../../../redux/actions/playerActions";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import SquadDetail from "./SquadDetail";
import PlayerList from "./players/PlayerList";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const SquadPage = ({
  squads,
  loadSquads,
  clubId,
  history,
  squadPlayers,
  players,
  loadPlayers,
  deletePlayer,
  userIsAuthenticated,
  ...props
}) => {
  const [squad, setSquad] = useState({ ...props.squad });

  useEffect(() => {
    if (squads.length === 0) {
      loadSquads().catch((error) => {
        toast.error("Loading squads failed failed, " + error.message, {
          autoClose: false,
        });
      });
    } else {
      setSquad({ ...props.squad });
    }
  }, [props.squad]);

  useEffect(() => {
    if (players.length === 0) {
      loadPlayers().catch((error) => {
        toast.error("Loading clubs failed. " + error.message, {
          autoClose: false,
        });
      });
    }
  }, [props.players]);

  const handlePlayerDelete = (player) => {
    confirmAlert({
      title: "Confirm deletion",
      message: `Are you sure you want to delete ${player.displayName}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deletePlayerOpto(player),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deletePlayerOpto = async (player) => {
    toast.success("Squad deleted");
    try {
      await deletePlayer(player);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <Link to={`/clubs`}>Clubs</Link>
          </li>
          <li>
            <Link to={`/club/${squad.clubId}`}>{squad.clubName}</Link>
          </li>
          <li className="is-active">
            <a href="#" aria-current="page">
              {squad.name}
            </a>
          </li>
        </ul>
      </nav>
      {squads.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <>
            <section className="hero is-primary">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">
                    {`${squad.clubName} ${squad.name}`}
                    {userIsAuthenticated && (
                      <span
                        className="icon is-medium ml-4 pointer"
                        onClick={() =>
                          history.push(`/club/${clubId}/squad/${squad.id}/edit`)
                        }
                      >
                        <ion-icon name="pencil-outline"></ion-icon>
                      </span>
                    )}
                  </h1>
                </div>
              </div>
            </section>
            <div className="box">
              <SquadDetail squad={squad} />
            </div>

            {squadPlayers.length > 0 ? (
              <PlayerList
                players={squadPlayers}
                onDeleteClick={handlePlayerDelete}
                userIsAuthenticated={userIsAuthenticated}
              />
            ) : (
              <div className="my-4 box">
                <h3 className="title is-3">Players</h3>
                <p>There are no players available to view.</p>
                {userIsAuthenticated && (
                  <p>Please add one using the add player button.</p>
                )}
              </div>
            )}

            {userIsAuthenticated && (
              <button
                style={{ marginBottom: 20 }}
                className="button is-primary add-player is-pulled-right"
                onClick={() =>
                  history.push(`/club/${clubId}/squad/${squad.id}/player`)
                }
              >
                Add Player
              </button>
            )}
          </>
        </>
      )}
    </>
  );
};

SquadPage.propTypes = {
  squad: PropTypes.object.isRequired,
  clubId: PropTypes.any.isRequired,
  squads: PropTypes.array.isRequired,
  loadSquads: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  loadPlayers: PropTypes.func.isRequired,
  squadPlayers: PropTypes.array.isRequired,
  deletePlayer: PropTypes.func.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const getSquadById = (squads, id) => {
  return squads.find((storedSquad) => storedSquad.id == id) || null;
};

const getSquadPlayers = (players, squad) => {
  return players.filter((storedPlayer) => storedPlayer.squadId == squad.id);
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.squadId;
  const squad =
    id && state.squads.length > 0 ? getSquadById(state.squads, id) : newSquad;
  const clubId = ownProps.match.params.clubId;
  const squadPlayers = squad.id ? getSquadPlayers(state.players, squad) : [];
  return {
    clubId,
    squad,
    squadPlayers,
    squads: state.squads,
    players: state.players,
    userIsAuthenticated: state.user != null,
  };
};

const mapDispatchToProps = {
  loadSquads,
  loadPlayers,
  deletePlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(SquadPage);
