import StackedBarGraph from "./StackedBarGraph";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


const Graphs = () => {
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);


  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    console.log("Use Effect called");
    setDomains(["Domain 1", "Domain 2", "Domain 3"]);
    // fetchData();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    console.log(e.target.id);
    setAnchorEl(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Select Domain
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {domains.map((domain) => (
            <MenuItem
              id={domain}
              key={domain}
              onClick={handleClose}
              id={domain}
            >
              {domain}
            </MenuItem>
          ))}
        </Menu>
      </div>

      <StackedBarGraph data={data} title="Graph 1" />
      <StackedBarGraph data={data} title="Graph 2" />
    </div>
  );
};

export default Graphs;
