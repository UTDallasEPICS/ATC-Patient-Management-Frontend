import PropTypes from "prop-types";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import { ResponsiveContainer } from "recharts";
// import styles from "../../../styles/Analytics.module.css";
import styles from "../../../styles/Analytics.module.css";

import "react-calendar-heatmap/dist/styles.css";

const ProbeGraph = ({ data, title }) => {
  const today = new Date();

  const randomValues = getRange(200).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(-1, 1),
    };
  });

  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div>
      <p>Hey</p>
      {title}
      <ResponsiveContainer width="95%" height={400}>
        <CalendarHeatmap
          startDate={shiftDate(today, -150)}
          endDate={today}
          values={randomValues}
          classForValue={(value) => {
            switch (value.count) {
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
            //     // return `color-github-${value.count}`;
            //   return styles.red;
            //   // return "color-failure";
          }}
          tooltipDataAttrs={(value) => {
            return {
              "data-tip": `${value.date.toISOString().slice(0, 10)} has: ${
                value.count
              }`,
            };
          }}
          showWeekdayLabels={true}
          onClick={(value) =>
            alert(`Clicked on value with count: ${value.count}`)
          }
        />
      </ResponsiveContainer>
      <ReactTooltip />
    </div>
  );
};

ProbeGraph.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default ProbeGraph;
