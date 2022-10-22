import React from 'react';
import './App.css';
import logo from './getfilxLogo.png';
import { useTable } from 'react-table';
import axios from 'axios';
import Table from './TableContainer.js';
import { format} from 'date-fns';

function App() {

  const [loadingData, setLoadingData] = React.useState(true);
  const [sortBy, setSortBy] = React.useState('all');
  const [UserIdForm, setUserIdForm] = React.useState('');
  const [movieIdForm, setMovieIdForm] = React.useState('');
  const [searchUserId, setSearchUserId] = React.useState('');
  const [searchMovieId, setSearchMovieId] = React.useState('');


  const columns = React.useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'userid', // accessor is the "key" in the data
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Webpage',
        accessor: 'webpage',
      },
      {
        Header: 'object',
        accessor: 'object',
      },
      {
        Header: 'Movie ID',
        accessor: 'movieid',
      },
      {
        Header: 'Movie Title',
        accessor: 'movietitle',
      },
      {
        Header: 'TimeStamp',
        accessor: 'timestamp',
      }
    ],
    []
  );

  const [clickData, setClickData] = React.useState([]);

  const getClicks = () => {
    axios.get('/clicks')
    .then((res) => {
      res.data.forEach(click => {
        click.timestamp = format (parseInt(click.timestamp), 'MM/dd/yyyy pp')
      })
      setClickData(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      setLoadingData(false);
    })
  }

  const getClicksUser = () => {
    axios.get(`/clicks/user?userid=${searchUserId}`)
    .then((res) => {
      res.data.forEach(click => {
        click.timestamp = format (parseInt(click.timestamp), 'MM/dd/yyyy pp')
      })
      setClickData(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      setLoadingData(false);
    })
  }

  const getClicksMovie = () => {
    axios.get(`/clicks/movie?movieid=${searchMovieId}`)
    .then((res) => {
      res.data.forEach(click => {
        click.timestamp = format (parseInt(click.timestamp), 'MM/dd/yyyy pp')
      })
      setClickData(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      setLoadingData(false);
    })
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (sortBy === 'all') {
        getClicks();
      } else if (sortBy === 'users') {
        getClicksUser();
      } else if (sortBy === 'movies') {
        getClicksMovie();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sortBy, searchUserId, searchMovieId]);

  return (
    <div className="App">
        <div className='landing-logo'>
          <img  alt='logo' src={logo} ></img>
        </div>
        <h1>Click Tracker</h1>
        <div className='sort-buttons'>
            <button className='single-button'
              onClick={() => {
                setLoadingData(true);
                setSortBy('all')}
              }>All Latest Clicks
            </button>
            <form className='single-button'>
              <label>
                UserID:
              <input type='number' step='1' min='0'
                value={UserIdForm}
                onChange={(event) => setUserIdForm(event.target.value)}
              />
              </label>
              <input type='button' value='search'
                onClick={() => {
                  setLoadingData(true);
                  setSearchUserId(UserIdForm);
                  setSortBy('users');
                }}
              />
            </form>
            <form className='single-button'>
              <label>
                MovieID:
              <input type='number' step='1' min='0'
                value={movieIdForm}
                onChange={(event) => setMovieIdForm(event.target.value)}
              />
              </label>
              <input type='button' value='search'
                onClick={() => {
                  setLoadingData(true);
                  setSearchMovieId(movieIdForm);
                  setSortBy('movies');
                }}
              />
            </form>
        </div>
        {loadingData ? (
          <p>Loading Please wait...</p>
        ) : (
          < Table columns={columns} data={clickData} />
        )}
    </div>
  );
}

export default App;
