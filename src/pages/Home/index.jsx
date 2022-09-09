import React from 'react';
import MovieList from '../../component/MovieList'
import LeftArrow from '../../component/LeftArrow'
import RightArrow from '../../component/RightArrow'
import Box from "@mui/material/Box"
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Home = (props) => {
    const [movies, setMovies] = useState([]);
    const [searchMovies, setSearchMovies] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const [selected, setSelected] = useState([]);
    const isItemSelected = (id) => !!selected.find((el) => el === id);

    const searchHandler = (event) => {
      let value = event.target.value;
      setSearchValue(value);
    }
    const handleClick =
      (id) =>
      ({ getItemById, scrollToItem }) => {
        const itemSelected = isItemSelected(id);

        setSelected((currentSelected) =>
          itemSelected
            ? currentSelected.filter((el) => el !== id)
            : currentSelected.concat(id)
        );
      };

   const getData = async ()=> {
    if(searchValue === ""){
      await axios('https://api.themoviedb.org/3/movie/popular?api_key=117e4c5d2b00bd0bdb8721232aaa4845&language=en-US&page=1')
      .then( response => {
          setMovies(response.data.results)
      })
      .catch( error => {
      console.error("error fetching data : ", error);
      setError(error)
      })
      .finally(() => {
          setLoading(false)
      })
    } else {
      await axios('https://api.themoviedb.org/3/search/movie?api_key=117e4c5d2b00bd0bdb8721232aaa4845&query='+searchValue+'&language=en-US&page=1&include_adult=false')
             .then( response => {
                 setMovies(response.data.results)
             })
             .catch( error => {
             console.error("error fetching data : ", error);
             setError(error)
             })
             .finally(() => {
                 setLoading(false)
             })
    }
   }

    function Paginate(array, page_sizes, page_number) {
    return array.slice((page_number - 1 ) * page_sizes, page_number * page_sizes);
   }

   let paginateMovie = []

  for(let i = 1; i <= movies.length/5; i++){
    paginateMovie.push(Paginate(movies, 10, i))
  }   

    useEffect( ()=> {
        getData();
    }, [searchValue])
    
    if(loading) return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
    if(error) return "error";     
      return (
        <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Re-Mov
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={props.value}
                  onChange={(event) => searchHandler(event)}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>

        <Box marginY="25%" sx={{
          minHeight:"100vh",
          alignItems:"center",
        }}>
              <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                  {movies.map((movie) => (
                    <MovieList itemId={movie.id} key={movie.id} movie={movie}  onClick={handleClick(movie.id)} />
                  ))}
              </ScrollMenu>
        </Box>      
    </>
  )
}

export default Home;