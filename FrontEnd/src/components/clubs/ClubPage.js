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

const ClubPage = ({
  clubs,
  squads,
  clubSquads,
  loadClubs,
  loadSquads,
  deleteSquad,
  history,
  ...props
}) => {
  const [club, setClub] = useState({ ...props.club });

  useEffect(() => {
    if (clubs.length === 0) {
      loadClubs().catch((err) => {
        alert("Loading clubs failed, " + err);
      });
    } else {
      setClub({ ...props.club });
    }
  }, [props.club]);

  useEffect(() => {
    if (squads.length === 0) {
      loadSquads().catch((err) => {
        alert("Loading squads failed, " + err);
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

  return clubs.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <>
        <h1 className="title is-1">
          {club.name}
          <span
            className="icon has-text-primary is-medium ml-4 pointer"
            onClick={() => history.push(`/club/${club.id}/edit`)}
          >
            <ion-icon name="pencil-outline"></ion-icon>
          </span>
        </h1>
        <ClubDetail club={club} />

        {squads.length > 0 && (
          <SquadList squads={clubSquads} onDeleteClick={handleSquadDelete} />
        )}
        <button
          style={{ marginBottom: 20 }}
          className="button is-primary add-squad is-pulled-right"
          onClick={() => history.push(`/club/${club.id}/squad`)}
        >
          Add Squad
        </button>
      </>
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
  const clubSquads = club.id ? getClubSquads(state.squads, club) : [];
  return {
    club,
    clubSquads,
    clubs: state.clubs,
    squads: state.squads,
  };
};

const mapDispatchToProps = {
  loadClubs,
  loadSquads,
  deleteSquad,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClubPage);
