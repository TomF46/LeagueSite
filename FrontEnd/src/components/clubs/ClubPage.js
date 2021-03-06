import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadClubs } from "../../redux/actions/clubActions";
import { loadSquads, deleteSquad } from "../../redux/actions/squadActions";
import { newClub } from "../../../tools/mockData";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ClubDetail from "./ClubDetail";
import SquadList from "./squads/SquadList";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import history from "../../history";

const ClubPage = ({
  clubs,
  squads,
  clubSquads,
  loadClubs,
  loadSquads,
  deleteSquad,
  userIsAuthenticated,
  history,
  ...props
}) => {
  const [club, setClub] = useState({ ...props.club });

  useEffect(() => {
    if (clubs.length === 0) {
      loadClubs().catch((error) => {
        toast.error("Loading clubs failed, " + error.message, {
          autoClose: false,
        });
      });
    } else {
      setClub({ ...props.club });
    }
  }, [props.club]);

  useEffect(() => {
    if (squads.length === 0) {
      loadSquads().catch((error) => {
        toast.error("Loading squads failed, " + error.message, {
          autoClose: false,
        });
      });
    }
  }, [props.squads]);

  const handleSquadDelete = (squad) => {
    confirmAlert({
      title: "Confirm deletion",
      message: `Are you sure you want to delete ${squad.name}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteSquadOpto(squad),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteSquadOpto = async (squad) => {
    toast.success("Squad deleted");
    try {
      await deleteSquad(squad);
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
          <li className="is-active">
            <a href="#" aria-current="page">
              {club.name}
            </a>
          </li>
        </ul>
      </nav>
      {clubs.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <>
            <section className="hero is-primary">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">
                    {club.name}
                    {userIsAuthenticated && (
                      <span
                        className="icon is-medium ml-4 pointer"
                        onClick={() => history.push(`/club/${club.id}/edit`)}
                      >
                        <ion-icon name="pencil-outline"></ion-icon>
                      </span>
                    )}
                  </h1>
                </div>
              </div>
            </section>
            <div className="box">
              <ClubDetail club={club} />
            </div>

            {clubSquads.length > 0 ? (
              <SquadList
                squads={clubSquads}
                onDeleteClick={handleSquadDelete}
                userIsAuthenticated={userIsAuthenticated}
              />
            ) : (
              <div className="my-4 box">
                <h3 className="title is-3">Squads</h3>
                <p>There are no squads available to view.</p>
                {userIsAuthenticated && (
                  <p>Please add one using the add squad button.</p>
                )}
              </div>
            )}
            {userIsAuthenticated && (
              <button
                style={{ marginBottom: 20 }}
                className="button is-primary add-squad is-pulled-right"
                onClick={() => history.push(`/club/${club.id}/squad`)}
              >
                Add Squad
              </button>
            )}
          </>
        </>
      )}
    </>
  );
};

ClubPage.propTypes = {
  club: PropTypes.object.isRequired,
  clubs: PropTypes.array.isRequired,
  squads: PropTypes.array.isRequired,
  clubSquads: PropTypes.array.isRequired,
  loadClubs: PropTypes.func.isRequired,
  loadSquads: PropTypes.func.isRequired,
  deleteSquad: PropTypes.func.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const getClubById = (clubs, id) => {
  return clubs.find((storedClub) => storedClub.id == id) || null;
};

const getClubSquads = (squads, club) => {
  return squads.filter((storedSquad) => storedSquad.clubId == club.id);
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const club =
    id && state.clubs.length > 0 ? getClubById(state.clubs, id) : newClub;
  if (club == null) history.push("/404");
  const clubSquads = club ? getClubSquads(state.squads, club) : [];
  return {
    club,
    clubSquads,
    clubs: state.clubs,
    squads: state.squads,
    userIsAuthenticated: state.user != null,
  };
};

const mapDispatchToProps = {
  loadClubs,
  loadSquads,
  deleteSquad,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClubPage);
