import React, { useEffect, useState } from "react";
import * as FixtureApi from "../../../../api/fixtureApi";
import * as ResultApi from "../../../../api/resultApi";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../../common/Spinner";
import { toast } from "react-toastify";
import ResultForm from "./ResultForm";
import { newResult } from "../../../../../tools/mockData";

const FixturePage = ({ id, leagueId, seasonId, history, ...props }) => {
  const [fixture, setFixture] = useState(null);
  const [result, setResult] = useState({ ...props.result });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!fixture) {
      FixtureApi.getFixtureById(id)
        .then((fixtureData) => {
          setFixture(fixtureData);
          setResult({
            fixtureId: fixtureData.id,
            homeScore: fixtureData.homeScore,
            awayScore: fixtureData.awayScore,
          });
        })
        .catch((error) => {
          console.log("Error getting the fixture data " + error);
        });
    }
  }, [id, fixture]);

  function handleChange(event) {
    const { name, value } = event.target;
    setResult((prevResult) => ({
      ...prevResult,
      [name]: parseInt(value, 10),
    }));
  }

  function formIsValid() {
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    console.log(result);

    setSaving(true);
    ResultApi.saveResult(result)
      .then(() => {
        toast.success("Result saved");
        history.push(
          `/league/${leagueId}/season/${seasonId}/fixture/${result.fixtureId}`
        );
      })
      .catch((err) => {
        setSaving(false);
        setErrors({ onSave: err.message });
      });
  }

  return !fixture ? (
    <Spinner />
  ) : (
    <>
      <ResultForm
        result={result}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </>
  );
};

FixturePage.propTypes = {
  result: PropTypes.object.isRequired,
  id: PropTypes.any.isRequired,
  leagueId: PropTypes.any.isRequired,
  seasonId: PropTypes.any.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const seasonId = ownProps.match.params.seasonId;
  const leagueId = ownProps.match.params.leagueId;
  const result = newResult;
  return {
    id,
    leagueId,
    seasonId,
    result,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FixturePage);
