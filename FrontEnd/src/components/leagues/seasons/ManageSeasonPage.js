import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadSeasons, saveSeason } from "../../../redux/actions/seasonActions";
import { newSeason } from "../../../../tools/mockData";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import SeasonForm from "./SeasonForm";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const ManageSeasonPage = ({
  seasons,
  loadSeasons,
  saveSeason,
  history,
  leagueId,
  userIsAuthenticated,
  ...props
}) => {
  const [season, setSeason] = useState({ ...props.season });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (seasons.length === 0) {
      loadSeasons().catch((err) => {
        alert("Loading seasons failed, " + err);
      });
    } else {
      setSeason({ ...props.season });
    }
  }, [props.season]);

  function handleChange(event) {
    const { name, value } = event.target;
    setSeason((prevSeason) => ({
      ...prevSeason,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { name } = season;
    const errors = {};
    if (!name) errors.name = "Name is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    season.leagueId = parseInt(leagueId, 10);

    setSaving(true);
    saveSeason(season)
      .then(() => {
        toast.success("Season saved");
        if (season.id) {
          history.push(`/league/${season.leagueId}/season/${season.id}`);
        } else {
          history.push(`/league/${season.leagueId}`);
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
      {seasons.length === 0 ? (
        <Spinner />
      ) : (
        <SeasonForm
          season={season}
          errors={errors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </>
  );
};

ManageSeasonPage.propTypes = {
  season: PropTypes.object.isRequired,
  seasons: PropTypes.array.isRequired,
  leagueId: PropTypes.any.isRequired,
  loadSeasons: PropTypes.func.isRequired,
  saveSeason: PropTypes.func.isRequired,
  userIsAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const getSeasonById = (seasons, id) => {
  return seasons.find((storedSeason) => storedSeason.id == id) || null;
};

const mapStateToProps = (state, ownProps) => {
  const leagueId = ownProps.match.params.leagueId;
  const id = ownProps.match.params.id;
  const season =
    id && state.seasons.length > 0
      ? getSeasonById(state.seasons, id)
      : newSeason;
  return {
    leagueId,
    season,
    seasons: state.seasons,
    userIsAuthenticated: state.user != null,
  };
};

const mapDispatchToProps = {
  loadSeasons,
  saveSeason,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSeasonPage);
