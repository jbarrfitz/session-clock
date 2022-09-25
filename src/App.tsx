import React from "react";
import Timer from "./Timer";
import { Configuration } from "@react-md/layout";
import { Grid } from "@react-md/utils";
import { AppBar, AppBarTitle } from "@react-md/app-bar";

const App = () => {
  return (
    <Configuration>
      <Grid padding={50} columns={1}>
        <div style={{ margin: "auto", maxWidth: 600 }}>
          <AppBar>
            <AppBarTitle>Countdown Timer</AppBarTitle>
          </AppBar>
          <Timer />
        </div>
      </Grid>
    </Configuration>
  );
};

export default App;
