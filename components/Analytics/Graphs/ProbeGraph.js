import PropTypes from "prop-types";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import Typography from "@material-ui/core/Typography";
import styles from "../../../styles/Analytics.module.css";

import "react-calendar-heatmap/dist/styles.css";

const ProbeGraph = ({ data, title }) => {
  const today = new Date();

  const randomValues = getRange(200).map((index) => {
    return {
      date: shiftDate(today, -index),
      result: getRandomInt(0, 1),
    };
  });

  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(result) {
    return Array.from({ length: result }, (_, i) => i);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>

      <CalendarHeatmap
        startDate={shiftDate(today, -150)}
        endDate={today}
        values={randomValues}
        classForValue={(value) => {
          if (!value) {
            return styles.colorEmpty;
          }

          switch (value.result) {
            case -1:
              return styles.probeEmpty;
            case 0:
              return styles.probeFailure;
            case 1:
              return styles.probeSuccess;
          }

          // return styles.probeEmpty;
          //   if (!value) {
          //     // return "color-empty";
          //     return styles.colorEmpty;
          //   }
          //     // return `color-github-${value.result}`;
          //   return styles.red;
          //   // return "color-failure";
        }}
        tooltipDataAttrs={(value) => {
          return {
            "data-tip": `${value.date.toISOString().slice(0, 10)} ${
              value.result === 1 ? "success" : "failure"
            }`,
          };
        }}
        showWeekdayLabels={true}
        onClick={(value) =>
          alert(`Clicked on value with result: ${value.result}`)
        }
      />
      <ReactTooltip />
    </div>
  );
};

ProbeGraph.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default ProbeGraph;
