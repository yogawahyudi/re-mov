import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from "@mui/material/IconButton";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Unstable_Grid2';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { Close as CloseIcon, ExpandLess as ExpandIcon, Send as SendIcon } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from 'axios';

const MovieDetail = () => {

  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [open, setOpen] = useState(false);
  const id = useParams();
  const [values, setValues] = useState({ id:0,name:"You",content:""})

  const changeHandler = (event) => {
    const {name, value} = event.target;
    setValues( {...values, "id":reviews.length,[name]:value});
  }

  const submitHandler = (event) => {
    event.preventDefault();
    let temp = [];
    temp = [ values,...reviews];
    setReviews(temp)
    setValues({ id:0,name:"You",content:""})
  }

  const deleteHandler = (id) => {
    let temp = reviews;
    const filtered = temp.filter( value => value.id !== id )
    setReviews(filtered)
  }

  const getMovieDetail = async (id) => {
    await axios('https://api.themoviedb.org/3/movie/' + id + '?api_key=117e4c5d2b00bd0bdb8721232aaa4845&language=en-US')
      .then(response => {
        setMovies(response.data)
      })
      .catch(error => {
        console.error("error fetching data : ", error);
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const getReviews = async (id) => {
    await axios('https://api.themoviedb.org/3/movie/' + id + '/reviews?api_key=117e4c5d2b00bd0bdb8721232aaa4845&language=en-US&page=1')
      .then(response => {
        let data = []
        for(let i =0; i < response.data.results.length; i++){
          data.push({"id":i,"name":response.data.results[i].author, "content":response.data.results[i].content})
        }
        setReviews(data);

      })
      .catch(error => {
        console.error("error fetching data : ", error);
        setError(error)
      })
      
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }


  useEffect(() => {
    setLoading(true);
    getReviews(id['id'])
    setLoading(true);
    getMovieDetail(id['id'])
  }, [setLoading])

  if (loading) return (
     <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  );
  if (error) return "error"
  return (
    <>
      <Box sx={{
        minHeight: "100vh"
      }}>
        <Box component="img"
          sx={{
            height: "auto",
            width: "100%"
          }}
          src={"https://image.tmdb.org/t/p/original/" + movies.backdrop_path}
          alt={movies.title}
        >
        </Box>
        <Box marginX={2} marginY={2}>
          <Paper elevation={6} sx={{
            paddingY: "2em",
            paddingX: "2em",
          }}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h3" align="center">
                {movies.title}
              </Typography>
              <Stack direction={{xs:"column"}}
                alignItems="center"
                spacing={2}
              >
                <Stack direction="row" spacing={0}>
                  <Rating value={1} max={1} size="large" />
                  <Typography variant="subtitle1">
                    {movies.vote_average}
                  </Typography>
                    <Chip label={movies.release_date} variant="outlined" sx={{
                      marginX:"1.5em"
                    }} />
                </Stack>
                <Grid container>
                  <Grid xs="auto">
                    {movies.genres.map((genre, i) => (
                      <Chip key={i} label={genre.name} variant="outlined" />
                    ))}
                  </Grid>
                </Grid>
              </Stack>
              <Typography variant="body2" align="justify">
                {movies.overview}
              </Typography>
              <Button variant="outlined" align="center" onClick={handleOpen}>
                  <ExpandIcon />
                <Typography variant="body2" >
                  Reviews
                </Typography>
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Box>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" >
              Reviews
            </Typography>
          </Toolbar>
        </AppBar>
        <Box padding={3}>
            <Box component="form"
            autoComplete="off"
            noValidate
            onSubmit={(event) => submitHandler(event)}
            >
              <TextField fullWidth label="Review" variant="outlined" name="content" value={values.content} onChange={(event)=>changeHandler(event)}  sx={{
                marginY:"1em"
              }} />
              <Button variant="contained" size="large" color="primary" endIcon={<SendIcon />} onClick={(event) => submitHandler(event)}>
              Send
              </Button>
            </Box>
            <List>
            {reviews.map((review) => (
              <Box key={review.id}>
                <ListItem>
                  <Stack direction="column"
                  width="100%"
                  >
                    <Stack direction="row"
                    justifyContent="space-around"
                    >
                      <ListItemText
                        primary={review.name}
                      />
                      {review.name === "You" ? ( <IconButton
                          edge="start"
                          color="inherit"
                          onClick={()=> deleteHandler(review.id) }
                        >
                          <CloseIcon />
                        </IconButton>) : null
                      }
                     
                    </Stack>
                    <ListItemText
                      secondary={review.content}
                      sx={{
                        overflowWrap:"anywhere"
                      }}
                    />
                  </Stack>
                </ListItem>
                 <Divider component="li" />
              </Box>
              ))}
            </List>
        </Box>
        
      </Dialog>
    </>
  )
}

export default MovieDetail