import React, {useState, useEffect} from "react";
import PropTypes, { string } from "prop-types";
import Link from "next/link";

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
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { ExitToApp } from "@material-ui/icons";

const drawerWidth = 240;

//styles for navbar (call function to get styles)
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

/*

    ----------------------------------------------------------
    INSERT CODE that fetches user role from auth0CheckUser.tsx
    ----------------------------------------------------------

*/

// const role = "BCBA" //for testing navbar

//functions defining js components for each "button"
function Logo() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.toolbar} />
            <div style={{marginLeft:"15px"}}>
            <img src="/logo.jpeg" alt="logo" />
        </div></div>);
}

function ManageBehaviors() {
    return (
    <div>
        <List>
            <Link href="/behaviors/manage">
                <ListItem button>
                    <ListItemIcon>
                        <MenuIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage Behaviors"></ListItemText>
                </ListItem>
            </Link>
        </List>
    </div>
    );
}

function StudentSearch() {
    return (
    <div>
        <List>
            <Link href="/student/search">
                <ListItem button>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Student Search"></ListItemText>
                </ListItem>
            </Link>
        </List>
    </div>
    );
}

function EmployeeSearch() {
    return (
    <div>
        <List>
            <Link href="/employee/search">
                <ListItem button>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Employee Search"></ListItemText>
                </ListItem>
            </Link>
        </List>
    </div>
    );
}

function NewEmployee() {
    return (
        <div>
            <List>
                <Link href="/employee/new">
                    <ListItem button>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="New Employee"></ListItemText>
                    </ListItem>
                </Link>
            </List>
        </div>
    );
}

function NewStudent() {
    return (
        <div>
            <List>
                <Link href="/student/new">
                    <ListItem button>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="New Student"></ListItemText>
                    </ListItem>
                </Link>
            </List>
        </div>
    );
}

function Logout() {
    return (
        <div>
            <List>
                <Link href="/api/auth/logout">
                    <ListItem button>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout"></ListItemText>
                    </ListItem>
                </Link>
            </List>
        </div>
    );
}

const Navbar = (props: { pageTitle; role; window?; children }) => {
    const { pageTitle, role, window, children } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    //render components based on user's role
    const drawer = (
                role == "Admin" ? (
                <div>
                        <Logo />
                    <Divider/>
                        <ManageBehaviors />
                    <Divider/>
                        <List>
                            <StudentSearch />
                            <NewStudent></NewStudent>
                        </List>
                    <Divider/>
                        <List>
                            <EmployeeSearch />
                            <NewEmployee />
                        </List>
                    <Divider/>
                        <Logout></Logout>
                </div>) 
                : role == "BCBA" ? (
                <div>
                        <Logo />
                    <Divider/>
                        <ManageBehaviors />
                    <Divider/>
                        <StudentSearch />
                    <Divider/>
                        <Logout></Logout>
                </div>)
                : role == "Technician" ? (
                <div>
                        <Logo />
                    <Divider/>
                        <StudentSearch />
                    <Divider/>
                        <Logout></Logout>
                </div>)
                : role == "Guardian" ? (
                <div>
                    <Logo />
                <Divider/>
                    <Logout></Logout>
                </div>)
                : null
    )
    
    //Container and css for navbar (the left-side of homescreens)
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
                <div
                    className={classes.toolbar}
                    style={{ paddingBottom: "70px" }}
                />
                {children}
            </main>
        </div>
    );
};

Navbar.propTypes = {
    pageTitle: PropTypes.string.isRequired,
};

export default Navbar;