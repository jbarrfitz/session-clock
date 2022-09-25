import React from 'react';
import Timer from './Timer'
import { Configuration } from "@react-md/layout";
import { Grid } from "@react-md/utils";
import {
  AppBar,
  AppBarNav,
  AppBarTitle,
  AppBarAction,
} from "@react-md/app-bar";



const App = () => {
    return (
        <Configuration>

        <Grid padding={0} columns={1}>
            <AppBar>
                <AppBarTitle>Countdown Timer</AppBarTitle>
            </AppBar>
            <Timer />
        </Grid>
        </Configuration>
    )
}

export default App;
