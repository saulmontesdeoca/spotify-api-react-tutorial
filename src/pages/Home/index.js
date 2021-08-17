import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [token, setToken] = useState('');
    const [playlists, setPlaylists] = useState({});
    const [artists, setArtists] = useState({});
    const [tracks, setTracks] = useState({});
    const [profile, setProfile] = useState({});

    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
    const TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=long_term";
    const ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?time_range=long_term";
    const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";

    const getParamsFromHash = (hash) => {
        const hashContent = hash.substr(1); // removes #
        const paramsSplit = hashContent.split('&'); // returns list with keys and values
        let params = {}; // fill with params
        let values = []; // use in foreach loop to store split return values
        paramsSplit.forEach((item) => {
            values = item.split('=');
            params[values[0]] = values[1];
        });
        return params;
    };

    // function to request data from spotify api
    const getData = async (endpoint, setFunction) => {
        await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // pass token to header
            },
        }).then(response => {
            setFunction(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });

    }
     useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, [token]);
        

    useEffect( () => { 
        // getting the token from the hash
        if(window.location.hash || token) {
            const hash = window.location.hash;
            const tokens = getParamsFromHash(hash);
            if(!token) {
                setToken(tokens.token);
            }
            localStorage.setItem('token', tokens.access_token);
            window.history.pushState({}, null, '/home');
        }
        // request to spotify api to fetch 
        getData(PLAYLISTS_ENDPOINT, setPlaylists);
        getData(TRACKS_ENDPOINT, setTracks);
        getData(ARTISTS_ENDPOINT, setArtists);
        getData(PROFILE_ENDPOINT, setProfile);
    }, []);

    return (
        <div>
            {token && <div>
                <h1>Home</h1>
                <p>Here's the token:</p>
                <p>{token}</p>
                </div>
            }
        </div>
    );
};

export default Home;