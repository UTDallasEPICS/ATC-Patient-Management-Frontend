import React from 'react'
import PropTypes from "prop-types";

const ProbeGraph = ({data, title}) => {
    return (
        <div>
            {title}
        </div>
    )
}

ProbeGraph.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  };

export default ProbeGraph
