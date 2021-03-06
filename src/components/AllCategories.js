import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext.js";
// material
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(44),
      height: theme.spacing(44),
    },
  },
}));

const AllCategories = (props) => {
  const theme = createMuiTheme({});
  const history = useHistory();
  const [allCategories, setAllCategories] = useState(null);
  const classes = useStyles();

  const getAllCategories = async () => {
    const response = await fetch(
      "https://nova-goat-ranker.herokuapp.com/categories/all"
    );
    const result = await response.json();
    setAllCategories(result);
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <br />
        <br />
        <br />
        <Typography className="cat-title" variant="h2">
          Categories
        </Typography>
        <br />

        {allCategories ? (
          <>
            <div className="please">
              <div className="all-cat-cont">
                <div className={classes.root}>
                  {allCategories.map((item, index) => {
                    return (
                      <>
                        <Paper
                          className="animation-target"
                          onClick={() =>
                            history.push(`/categories/${item.name}`)
                          }
                          elevation={3}
                        >
                          <div className="cat-papers">
                            <Typography variant="h4">{item.name}</Typography>
                            <Typography variant="h6" gutterBottom>
                              Total Votes: {item.userVotes.length}
                            </Typography>
                          </div>
                        </Paper>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="main-cont">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div class="cssload-weird">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </>
        )}
      </ThemeProvider>
    </>
  );
};

export default AllCategories;
