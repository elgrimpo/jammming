let accessToken;
const clientID = 'ba5ab3510fc6497db820e2428caec407';
const redirectURI = 'http://localhost:3000/'

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken
        }
    
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1])
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        } else {
        let accessUrl = 'https://accounts.spotify.com/authorize';
        accessUrl += '?response_type=token';
        accessUrl += '&client_id=' + encodeURIComponent(clientID);
        accessUrl += '&redirect_uri=' + encodeURIComponent(redirectURI);
        window.location = accessUrl
        }
    },
    
    async search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
            if(!jsonResponse) {
                return []
            } else {
                console.log(jsonResponse)
                
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    title: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                })) 
            }
        })
    }

    }




export default Spotify