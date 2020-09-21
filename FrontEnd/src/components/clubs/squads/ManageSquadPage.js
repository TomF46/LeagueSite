import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadSquads, saveSquad } from "../../../redux/actions/squadActions";
import { newSquad } from "../../../../tools/mockData";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import SquadForm from "./SquadForm";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const ManageSquadPage = ({
  squads,
  clubId,
  loadSquads,
  saveSquad,
  userIsAuthenticated,
  history,
  ...props
}) => {
  const [squad, setSquad] = useState({ ...props.squad });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (squads.length === 0) {
      loadSquads().catch((error) => {
        toast.error("Loading squads failed, " + error.message, {
          autoClose: false,
        });
      });
    } else {
      setSquad({ ...props.squad });
    }
  }, [props.squad]);

  function handleChange(event) {
    const { name, value } = event.target;
    setSquad((prevSquad) => ({
      ...prevSquad,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { name } = squad;
    const errors = {};
    if (!name) errors.name = "Name is required.";
    if (name.length > 40)
      errors.name = "Name cannot be longer than 40 characters.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    if (!squad.clubId) squad.clubId = parseInt(clubId, 10);
    saveSquad(squad)
      .then(() => {
        toast.success("Squad saved");
        if (squad.id) {
          history.push(`/club/${clubId}/squad/${squad.id}`);
        } else {
          history.push(`/club/${clubId}`);
        }
      })
      .catch((err) => {
        setSaving(false);
        setErrors({ onSave: err.message });
      });
  }

  return (
    <>
      {!userIsAuthenticated && <Redirect to="/" />}
      {squads.length === 0 ? (
        <Spinner />
      ) : (
        <SquadForm
          squad={squad}
          errors={errors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </>
  );
};

ManageSquadPage.propTypes = {
  squad: PropTypes.object.isRequired,
  clubId: PropTypes.any.isRequired,
  squads: PropTypes.array.isRequired,
  loadSquads: PropTypes.func.isRequired,
  saveSquad: PropTypes.func.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const getSquadById = (squads, id) => {
  return squads.find((storedSquad) => storedSquad.id == id) || null;
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.squadId;
  const squad =
    id && state.squads.length > 0 ? getSquadById(state.squads, id) : newSquad;
  const clubId = ownProps.match.params.clubId;
  return {
    clubId,
    squad,
    squads: state.squads,
    userIsAuthenticated: state.user != null,
  };
};

const mapDispatchToProps = {
  loadSquads,
  saveSquad,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSquadPage);
