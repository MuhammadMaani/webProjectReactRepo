import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	InputBase,
	fade,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import userService from "../services/UserService";

const useStyles = makeStyles((theme) => ({
	link: {
		color: "white",
		paddingRight: "2rem",
	},
	navbr: {
		backgroundColor: "black",
		position: "static",
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.75),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.95),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 19),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "right",
	},
}));

const TopMenu = () => {
	const classes = useStyles();
	return (
		<AppBar className={classes.navbr}>
			<Toolbar>
				<Typography variant="h6">
					<Link to="/" className={classes.link}>
						Home
					</Link>
				</Typography>
				<Typography variant="h6">
					<Link to="/products" className={classes.link}>
						Products
					</Link>
				</Typography>

				<Typography variant="h6">
					<Link to="/contact-us" className={classes.link}>
						Contact Us
					</Link>
				</Typography>
				{!userService.isLoggedIn() ? (
					<>
						<Typography variant="h6">
							<Link to="/login" className={classes.link}>
								Login
							</Link>
						</Typography>
						<Typography variant="h6">
							<Link to="/register" className={classes.link}>
								Sign-Up
							</Link>
						</Typography>
					</>
				) : (
					<Button
						variant="contained"
						color="dark"
						onClick={(e) => {
							userService.logout();
							window.location.reload();
						}}
					>
						LogOut {userService.getLoggedInUser().Name}
					</Button>
				)}
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder="Search…"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ "aria-label": "search" }}
					/>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default TopMenu;
