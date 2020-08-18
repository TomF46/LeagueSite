import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { newSquad } from "../../../../tools/mockData";
import { loadSquads } from "../../../redux/actions/squadActions";
import { loadClubs } from "../../../redux/actions/clubActions";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import SquadDetail from "./SquadDetail";

const SquadPage = ({
  squads,
  loadSquads,
  clubId,
  history,
  clubs,
  loadClubs,
  ...props
}) => {
  const [squad, setSquad] = useState({ ...props.squad });
  const [club, setClub] = useState({ ...props.club });

  useEffect(() => {
    if (squads.length === 0) {
      loadSquads().catch((err) => {
        alert("Loading clubs failed, " + err);
      });
    } else {
      setSquad({ ...props.squad });
    }
  }, [props.squad]);

  useEffect(() => {
    if (clubs.length === 0) {
      loadClubs().catch((err) => {
        alert("Loading clubs failed, " + err);
      });
    } else {
      setClub({ ...props.club });
    }
  }, [props.club]);

  return squads.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <>
        <h1>{squad.name}</h1>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-club"
          onClick={() =>
            history.push("/club/" + clubId + "/squad/" + squad.id + "/edit")
          }
        >
          Edit {squad.name}
        </button>
        <SquadDetail squad={squad} club={club} />
      </>
    </>
  );
};

SquadPage.propTypes = {
  squad: PropTypes.object.isRequired,
  club: PropTypes.object.isRequired,
  clubId: PropTypes.any.isRequired,
  squads: PropTypes.array.isRequired,
  loadSquads: PropTypes.func.isRequired,
  clubs: PropTypes.object.isRequired,
  loadClubs: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const getSquadById = (squads, id) => {
  return squads.find((storedSquad) => storedSquad.id == id) || null;
};

const getClubById = (clubs, id) => {
  return clubs.find((club) => club.id == id);
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.squadId;
  const squad =
    id && state.squads.length > 0 ? getSquadById(state.squads, id) : newSquad;
  const clubId = ownProps.match.params.clubId;
  const club = getClubById(state.clubs, clubId);
  return {
    clubId,
    club,
    squad,
    squads: state.squads,
    clubs: state.clubs,
  };
};

const mapDispatchToProps = {
  loadSquads,
  loadClubs,
};

export default connect(mapStateToProps, mapDispatchToProps)(SquadPage);
