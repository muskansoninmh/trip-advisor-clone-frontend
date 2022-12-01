import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeSalesAction } from '../../Store/actions/action'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Grid } from '@material-ui/core';
import { classes } from 'istanbul-lib-coverage';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useState } from 'react';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const useStyles = makeStyles((theme) => ({
    grid: {
        display: "inline-grid",
        width: "100px"
    }
}))



function Chart(props) {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState()
    const amountOfSpecificMonth = (month) => {
        let amount;
        // console.log(props.salesList);
        const a = props.salesList.map((sales) => {

            if (sales._id === month) {
                return amount = sales.total
            }
            else {
                return amount = 0;
            }

        })
        const b = a.filter((s) => s !== 0)
        return b[0] || 0;
    }

    const data = [
        createData('Jan', amountOfSpecificMonth(1)),
        createData('Feb', amountOfSpecificMonth(2)),
        createData('Mar', amountOfSpecificMonth(3)),
        createData('Aprl', amountOfSpecificMonth(4)),
        createData('May', amountOfSpecificMonth(5)),
        createData('Jun', amountOfSpecificMonth(6)),
        createData('Jul', amountOfSpecificMonth(7)),
        createData('Aug', amountOfSpecificMonth(8)),
        createData('Sep', amountOfSpecificMonth(9)),
        createData('Oct', amountOfSpecificMonth(10)),
        createData('Nov', amountOfSpecificMonth(11)),
        createData('Dec', amountOfSpecificMonth(12)),

    ];
    const theme = useTheme();
    React.useEffect(async () => {
        const res = await props.storeSalesAction(new Date().getFullYear());


    }, [])
    const handleDateChange = async (e) => {
        console.log(e.getFullYear())

        setSelectedDate(e);
        const res = await props.storeSalesAction(e.getFullYear());

    }
    console.log(data);
    return (
        <React.Fragment>
            <div style={{
                display: "flex",
                justifyContent: "flex-end"
            }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid className={classes.grid}>
                        <label>Year</label>
                        <DatePicker
                            views={["year"]}
                            margin="dense"
                            size="small"
                            // label="Year"
                            // maxDate={new Date()}
                            inputVariant="outlined"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </div>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}

                >
                    <XAxis dataKey="time" stroke="#000" />
                    <YAxis stroke="#000">
                        <Label
                            angle={270}
                            position="left"

                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Sales ($)
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
                </LineChart>

            </ResponsiveContainer>

        </React.Fragment>
    );
}
const mapPropsToValues = (state) => {
    return {
        salesList: state.vacation.salesList
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ storeSalesAction }, dispatch);
};

export default connect(mapPropsToValues, mapDispatchToProps)(Chart);