import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadLeagues, saveLeague } from "../../redux/actions/leagueActions";
import { newLeague } from "../../../tools/mockData";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import LeagueForm from "./LeagueForm";
import { toast } from "react-toastify";

const ManageLeaguePage = ({
  leagues,
  loadLeagues,
  saveLeague,
  history,
  ...props
}) => {
  const [league, setLeague] = useState({ ...props.league });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (leagues.length === 0) {
      loadLeagues().catch((err) => {
        alert("Loading leagues failed, " + err);
      });
    } else {
      setLeague({ ...props.league });
    }
  }, [props.league]);

  function handleChange(event) {
    const { name, value } = event.target;
    setLeague((prevLeague) => ({
      ...prevLeague,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { name } = league;
    const errors = {};
    if (!name) errors.name = "Name is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveLeague(league)
      .then(() => {
        toast.success("League saved");
        if (league.id) {
          history.push(`/league/${league.id}`);
        } else {
          history.push("/leagues");
        }
      })
      .catch((err) => {
        setSaving(false);
        setErrors({ onSave: err.message });
      });
  }

  return leagues.length === 0 ? (
    <Spinner />
  ) : (
    <LeagueForm
      league={league}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

ManageLeaguePage.propTypes = {
  league: PropTypes.object.isRequired,
  leagues: PropTypes.array.isRequired,
  loadLeagues: PropTypes.func.isRequired,
  saveLeague: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const getLeagueById = (leagues, id) => {
  return leagues.find((storedLeague) => storedLeague.id == id) || null;
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const league =
    id && state.leagues.length > 0
      ? getLeagueById(state.leagues, id)
      : newLeague;
  return {
    league,
    leagues: state.leagues,
  };
};

const mapDispatchToProps = {
  loadLeagues,
  saveLeague,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageLeaguePage);