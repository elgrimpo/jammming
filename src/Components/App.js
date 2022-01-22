import './App.css';
import {SearchBar} from './SearchBar/SearchBar'
import {SearchResults} from './SearchResults/SearchResults'
import {Playlist} from './Playlist/Playlist'
import React from 'react';
import Spotify from '../util/Spotify.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults : [],
      playlistName : 'custom list',
      playlistTracks : [],
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  search(input) {
    console.log(input)
    Spotify.search(input).then(results => {
      this.setState({searchResults : results})
    })
    
  }

  addTrack(track) {
    const newPlaylist = this.state.playlistTracks;
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
    newPlaylist.push(track);
    this.setState({playlistTracks: newPlaylist})
    }
  }

  removeTrack(track) {
    const index = this.state.playlistTracks.indexOf(track)
    const newPlaylist = this.state.playlistTracks.splice(index,1)
    this.setState({playlistTracks: newPlaylist})
    }

  updatePlaylistName(name) {
    this.setState({playlistName : name})
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(() => {
      this.setState({playlistName: 'New Playlist'});
      this.setState({playlistTracks : []})
  })

  }

  render() {
  return (
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar
      onSearch={this.search}/>
    <div className="App-playlist">
    <SearchResults 
      searchResults={this.state.searchResults} 
      addTrack={this.addTrack}/>
    <Playlist 
      playlistName={this.state.playlistName} 
      playlistTracks={this.state.playlistTracks} 
      removeTrack={this.removeTrack} 
      onNameChange={this.updatePlaylistName}
      onSave={this.savePlaylist}/>
    </div>
  </div>
</div>
  );
}
}
export default App;
