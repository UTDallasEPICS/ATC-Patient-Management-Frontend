import React from "react";
import Chip from "@material-ui/core/Chip";
import styles from "../styles/EditProgram.module.css";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Fab from '@material-ui/core/Fab';

const DomainInput = () => {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Tag 1" },
    { key: 1, label: "Tag 2" },
    { key: 2, label: "Tag 3" },
    { key: 3, label: "Tag 4" },
    { key: 4, label: "Tag 5" },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const addIcon = <AddIcon />;

  return (
    <Paper component="ul" className={styles.domainPaper}>
      {chipData.map((data) => {
        let icon;

        return (
          <li key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={handleDelete(data)}
              className={styles.chip}
            />
          </li>
        );
      })}

      {/* <li >
        <Chip
          icon={addIcon}
          className="addDomainButton"
        />
      </li> */}

      <Fab color="primary" size="small" aria-label="add" style={{marginLeft:"25px", marginTop:"10px"}}>
        <AddIcon />
      </Fab>
    </Paper>
  );
};

export default DomainInput;
