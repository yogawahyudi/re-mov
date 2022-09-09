import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Stack, Dialog, DialogActions, DialogTitle, DialogContent, Paper, Typography, Button, } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Link as RouterLink} from "react-router-dom";

const MovieList = (props) => {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false)
  }
  
  const handleOpen = () => {
    setOpen(true)
  }

  const handleMouseEnter = (id) => {
    setHover(true)
  }
  const handleMouseLeave = (id) => {
    setHover(false)
  }
  
  return (
    <>
    <Paper sx={{
      marginX: "1em",
      cursor: "pointer",
      filter: hover ? "brightness(0.3)" : 'unset'
    }}
     onClick={handleOpen}
     onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    >
      <Box component="img"
        sx={{
          height: 200,
          width: 200,
        }}
        src={"https://image.tmdb.org/t/p/w500/" + props.movie.poster_path}
        alt={props.movie.title}
      >
      </Box>
    </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="sm">
        <DialogTitle id="alert-dialog-title">
          <Stack direction="row"
          justifyContent="space-between"
          >
         
          </Stack>
        </DialogTitle>
        <DialogContent>
            <Stack direction="row"
            justifyContent="space-between"
            alignContent="center"
            spacing={2}>
              <Box component="img"
                sx={{
                  height: 200,
                  width: 200,
                }}
                src={"https://image.tmdb.org/t/p/w500/" + props.movie.poster_path}
                alt={props.movie.title}
              >
              </Box>
              <Stack direction="column" spacing={2}>
                <Stack direction="row"
                justifyContent="space-between">
                   <Typography variant="h6">
                    {props.movie.title}
                    </Typography>
                    <Button variant='link' onClick={handleClose}>
                      <Close />
                    </Button>
                </Stack>
              <Typography variant="subtitle2">
                {props.movie.release_date}
              </Typography>
              <Typography variant="subtitle2" align="justify">
                {props.movie.overview}
              </Typography>
              </Stack>
            </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} to={"/movie/"+ props.movie.id} variant="contained" component={RouterLink}>
            Detail
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MovieList