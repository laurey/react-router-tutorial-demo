import React from "react";
import PropTypes from "prop-types";
import Exception from "../components/Exception";

function ExceptionPage({ type = 404, match: { params } }) {
  return (
    <Exception
      type={params.type || type}
      style={{ padding: 10, backgroundColor: "#f905" }}
    >
      <div style={{ padding: 20, backgroundColor: "#ccc3" }}>
        <span>From Exception Route</span>
        <div>ExceptionPage Type: {params.type || type}</div>
        <div>match.params: {JSON.stringify(params)}</div>
      </div>
    </Exception>
  );
}

ExceptionPage.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ExceptionPage;
