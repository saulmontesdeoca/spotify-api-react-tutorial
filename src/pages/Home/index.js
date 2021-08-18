import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [token, setToken] = useState('');
    const [playlists, setPlaylists] = useState({});
    const [artists, setArtists] = useState({});
    const [tracks, setTracks] = useState({});
    const [profile, setProfile] = useState({});

    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
    const TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=12";
    const ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=12";
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
                localStorage.setItem('token', tokens.access_token);
            }
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
            {
                profile.display_name && profile.images &&
                <div className="profile">
                    <img src={profile.images[0].url} alt="profile" /> 
                    <h1>Hello 👋, {profile.display_name}!</h1>
                </div>
            }
            {
                tracks.items &&  
                <div className="list">
                    <h1>Your top tracks</h1>
                    <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto auto'}}>
                    {
                        tracks.items.map((track, index) => {
                            return (
                                <div key={index} className="track" style={{width: '100%', textAlign: 'center'}}>
                                    <img src={track.album.images[0].url} alt="profile" /> 
                                    <h2>{track.name}</h2>
                                    <h3>By {track.artists[0].name}</h3>
                                </div>
                            );
                        }
                        )
                    }
                    </div>
                </div>
            }
        </div>
    );
};

export default Home;