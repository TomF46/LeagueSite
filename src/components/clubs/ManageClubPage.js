import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadClubs, saveClub } from "../../redux/actions/clubActions";
import { newClub } from "../../../tools/mockData";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ClubForm from "./ClubForm";
import { toast } from "react-toastify";

const ManageClubPage = ({ clubs, loadClubs, saveClub, history, ...props }) => {
  const [club, setClub] = useState({ ...props.club });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (clubs.length === 0) {
      loadClubs().catch((err) => {
        alert("Loading clubs failed, " + err);
      });
    } else {
      setClub({ ...props.club });
    }
  }, [props.club]);

  function handleChange(event) {
    const { name, value } = event.target;
    setClub((prevClub) => ({
      ...prevClub,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { name, location } = club;
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!location) errors.location = "Location is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveClub(club)
      .then(() => {
        toast.success("Club saved");
        history.push("/clubs");
      })
      .catch((err) => {
        setSaving(false);
        setErrors({ onSave: err.message });
      });
  }

  return clubs.length === 0 ? (
    <Spinner />
  ) : (
    <ClubForm
      club={club}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

ManageClubPage.propTypes = {
  club: PropTypes.object.isRequired,
  clubs: PropTypes.array.isRequired,
  loadClubs: PropTypes.func.isRequired,
  saveClub: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const getClubById = (clubs, id) => {
  return clubs.find((storedClub) => storedClub.id == id) || null;
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const club =
    id && state.clubs.length > 0 ? getClubById(state.clubs, id) : newClub;
  return {
    club,
    clubs: state.clubs,
  };
};

const mapDispatchToProps = {
  loadClubs,
  saveClub,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClubPage);
