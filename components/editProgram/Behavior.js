import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import styles from "../../styles/EditProgram.module.css";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';

const Behavior = ({ list, mastered }) => {

  const options = ["Delete", "Move to Mastered"];

  
  

const ITEM_HEIGHT = 48;


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div>
      {list.map((item) => (
        <Accordion key={item.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{item.name} </Typography>
       
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography color="textSecondary" variant="body2">
                Type: <br />
                {item.type}
                <div className={styles.threeDotMenu}>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                  <MoreVertIcon />
              </IconButton>
              </div>

              <Menu
                id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch"
          }
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
                <br />
                <br />
              </Typography>

              <Typography color="textSecondary" variant="body2">
                Description: <br />
                {item.description}
                <br />
                <br />
              </Typography>

              <Typography color="textSecondary" variant="body2">
                Mastery Criteria: <br />
                {item.masteryCriteria}
                <br />
                <br />
              </Typography>

              <Typography color="textSecondary" variant="body2">
                Domain: <br />
              </Typography>
              {item.domain.map((data) => {
                return <Chip label={data} key={data} className={styles.chip} />;
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Behavior;
