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
      searchResults : [{title:'title1', album:'album1', artist:'artist1', id:1},{title:'title2', album:'album2', artist:'artist2', id:2},{title:'title3', album:'album3', artist:'artist3', id:3}],
      playlistName : 'custom list',
      playlistTracks : [{title:'title4', album:'album4', artist:'artist4', id:4},{title:'title5', album:'album5', artist:'artist5', id:5}],
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
