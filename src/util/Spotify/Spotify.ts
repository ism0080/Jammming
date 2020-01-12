const Spotify = {
  async search(term: string, token: any) {
    const headers = { Authorization: `Bearer ${token.token}` }
    // Search for Song
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers,
    })
    const jsonResponse = await response.json()
    if (!jsonResponse.tracks) {
      return []
    }
    // Return song JSON
    return jsonResponse.tracks.items.map((track: any) => ({
      album: track.album.name,
      artist: track.artists[0].name,
      id: track.id,
      image: track.album.images[0].url,
      name: track.name,
      uri: track.uri,
    }))
  },

  async savePlaylist(name: string, trackUris: Array<string | undefined>, token: any) {
    if (!name || !trackUris.length) {
      return
    }

    const headers = { Authorization: `Bearer ${token.token}` }
    let userId: string

    // Get UserID
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers,
    })
    const jsonResponse = await response.json()
    userId = jsonResponse.id

    // Get User PLaylists
    const response1 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      body: JSON.stringify({ name }),
      headers,
      method: 'POST',
    })
    const jsonResponse1 = await response1.json()
    const playlistId = jsonResponse1.id

    // Save User Playlist
    const response2 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      body: JSON.stringify({ uris: trackUris }),
      headers,
      method: 'POST',
    })
    return response2
  },

  async getUserPlaylists(token: any) {
    const headers = { Authorization: `Bearer ${token.token}` }
    let userId

    // Get User Id
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers,
    })
    const jsonResponse = await response.json()
    userId = jsonResponse.id
    // Get User Playlists
    const response1 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers,
      method: 'GET',
    })
    const jsonResponse1 = await response1.json()
    if (!jsonResponse1.items) {
      return []
    }
    // Return User Playlists
    return jsonResponse1.items.map((item: any) => ({
      id: item.id,
      image: item.images[0].url,
      name: item.name,
      tracks: item.tracks.total,
    }))
  },

  async getUserInformation(token: any) {
    const headers = { Authorization: `Bearer ${token.token}` }

    // Get user Info
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers,
    })
    const jsonResponse = await response.json()
    // Return user info
    return {
      avatar: jsonResponse.images[0].url,
      name: jsonResponse.display_name,
    }
  },
}

export default Spotify

/*
    TODO: Things to Add:
    - Your Current Top artists
    - View songs in playlists
    - Edit songs in playlists
    - Song player
    - Show users Name
    - Webpack
*/
