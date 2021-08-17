const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"; // obtained from Spotify API docs
const REDIRECT_URL_AFTER_LOGIN = process.env.REACT_APP_REDIRECT_URL; // once logged in -> redirect to home
const SPACE_DELIMITER = "%20";
const SCOPES = [
    "user-top-read", // for getting the user's top tracks and artists
    "user-read-private",
    "user-library-read",
    "playlist-read-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

module.exports ={ CLIENT_ID, CLIENT_SECRET, SPOTIFY_AUTHORIZE_ENDPOINT, REDIRECT_URL_AFTER_LOGIN, SCOPES_URL_PARAM }