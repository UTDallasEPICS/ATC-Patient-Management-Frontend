import React from 'react';
import styles from "../../../styles/AddSession.module.css"

class StopwatchDisplay extends React.Component {
  render() {
    return (
      <div className={styles.stopwatchDisplay}>
        <span>
          {this.props.formatTime(this.props.currentTimeMin)}:
          {this.props.formatTime(this.props.currentTimeSec)}:
          {this.props.formatTime(this.props.currentTimeMs, 'ms')}
        </span>
      </div>
    );
  }
}

export default StopwatchDisplay;
