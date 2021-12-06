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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const Behavior = ({ list, studentId, updateBehaviorList }) => {
  const options = [
    {
      name: "Delete",
      onCall: (id) => {
        console.log(id);
        setDialogOpen(true);
        setFocusBehavior(id);
      },
    },
  ];

  const ITEM_HEIGHT = 48;

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [focusBehavior, setFocusBehavior] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDialogOpen(false);
    setFocusBehavior("");
  };

  const removeBehavior = async (behaviorId) => {
    // console.log(
    //   `Will remove behavior with id ${focusElement} from student with id ${studentId}`
    // );
    if (behaviorId === "" || !behaviorId) {
      console.log("No behavior ID");
      return;
    }
    console.log(list);
    console.log(focusBehavior);
    // try {
    //   await fetch(
    //     `http://localhost:8080/patient/program/${studentId}/delete/${behaviorId}`,
    //     {
    //       method: "delete",
    //       mode: "cors",
    //     }
    //   );
    //   updateBehaviorList((prev) =>
    //     [...prev].filter((behavior) => behavior.id !== behaviorId)
    //   );
    // } catch (error) {
    //   console.log("Cannot delete behavior! Please try again later");
    // }
  };

  return (
    <div>
      <>
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
                  {item.datatype}
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
                        width: "20ch",
                      },
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem
                        key={option.name}
                        selected={option.name === "Pyxis"}
                        onClick={(e) => {
                          console.log(item);
                          handleClick(e);
                          option.onCall(item.id);
                        }}
                      >
                        {option.name}
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

                {/* <Typography color="textSecondary" variant="body2">
                Mastery Criteria: <br />
                {item.masteryCriteria}
                <br />
                <br />
              </Typography> */}

                {/* <Typography color="textSecondary" variant="body2">
                Domain: <br />
              </Typography>
              {item.domain.map((data) => {
                return <Chip label={data} key={data} className={styles.chip} />;
              })} */}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
        <Dialog
          open={dialogOpen}
          onClose={() => {
            handleClose();
          }}
        >
          <DialogTitle>Remove this behavior?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove this behavior?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              No
            </Button>
            <Button
              onClick={async () => {
                await removeBehavior(focusBehavior);
                handleClose();
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
};

export default Behavior;
