import React from 'react';
// import { motion } from 'framer-motion';
import { makeStyles } from "@material-ui/core";
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
import NotFoundAnimation from './Animation/notFoundAnimation';
// components
// import { MotionContainer, varBounceIn } from './Animation';


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        alignItems: 'center',
        paddingTop: theme.spacing(15),
        paddingBottom: theme.spacing(10)
    },
}));

const NotFound404Page = () => {
    const classes = useStyles();

    return (
        <div title="404 Page Not Found | Minimal-UI" className={classes.root}>
            <Container>
                {/* <MotionContainer initial="initial" open> */}
                {/* <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}> */}
                {/* {/* <motion.div variants={varBounceIn}> */}
                {/* <Typography variant="h3" paragraph> */}
                {/* Sorry, page not found! */}
                {/* </Typography> */}
                {/* <motion.div>  */}
                {/* <Typography sx={{ color: 'text.secondary' }}> */}
                {/* Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? */}
                {/* Be sure to check your spelling. */}
                {/* </Typography> */}

                {/* <motion.div variants={varBounceIn}> */}

                {/* </motion.div> */}


                {/* </Box> */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <NotFoundAnimation />
                </div>
                {/* </MotionContainer> */}
            </Container>

        </div>
    );
};
export default NotFound404Page;
