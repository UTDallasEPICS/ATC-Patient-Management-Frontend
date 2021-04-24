import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/Navbar.module.css";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TransitionGroup } from "react-transition-group";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      paddingTop: 0,
    },
    paddingTop: "40px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Navbar = (props: { pageTitle, window?, children }) => {
  const { pageTitle,window, children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {[
          ["Student Search", "/studentSearch"],
          ["New Student", "/newStudent"],
        ].map((item, index) => (
          <Link href={item[1]} key={item[0]}>
            <ListItem button>
              <ListItemIcon>
                {
                  {
                    "Student Search": <SearchIcon />,
                    "New Student": <AddIcon />,
                  }[item[0]]
                }
              </ListItemIcon>
              <ListItemText primary={item[0]} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {[
          ["Employee Search", "/"],
          ["New Employee", "/"],
        ].map((item, index) => (
          <Link href={item[1]} key={item[0]}>
            <ListItem button>
              <ListItemIcon>
                {
                  {
                    "Employee Search": <SearchIcon />,
                    "New Employee": <AddIcon />,
                  }[item[0]]
                }
              </ListItemIcon>
              <ListItemText primary={item[0]} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {[["Logout", "/"]].map((item, index) => (
          <Link href={item[1]} key={item[0]}>
            <ListItem button>
              <ListItemIcon>
                {
                  {
                    Logout: <ExitToAppIcon />,
                  }[item[0]]
                }
              </ListItemIcon>
              <ListItemText primary={item[0]} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} style={{paddingBottom: "70px"}} />
        {children}
      </main>
    </div>
  );
};

Navbar.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Navbar;
