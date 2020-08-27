import React, { useEffect, useState } from "react";
import * as LeagueTableApi from "../../../api/leagueTableApi";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner";
import LeagueTable from "./LeagueTable";

const LeagueTablePage = ({ seasonId }) => {
  const [leagueTable, setLeagueTable] = useState(null);

  useEffect(() => {
    if (!leagueTable) {
      LeagueTableApi.getLeagueTableByLeagueId(seasonId)
        .then((leagueTableData) => {
          setLeagueTable(leagueTableData);
        })
        .catch((error) => {
          console.log("Error getting the leagueTable data " + error);
        });
    }
  }, [seasonId, leagueTable]);

  return !leagueTable ? (
    <Spinner />
  ) : (
    <>
      <LeagueTable leagueTable={leagueTable} />
    </>
  );
};

LeagueTablePage.propTypes = {
  seasonId: PropTypes.any.isRequired,
  leagueId: PropTypes.any.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const seasonId = ownProps.match.params.seasonId;
  const leagueId = ownProps.match.params.leagueId;
  return {
    seasonId,
    leagueId,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LeagueTablePage);
