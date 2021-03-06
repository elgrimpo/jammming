import './TrackList.css'
import React from 'react'
import {Track} from '../Track/Track'

export class TrackList extends React.Component {
    render() {
        return (
        <div className="TrackList">
            {
            this.props.tracks.map(track => {
            return <Track 
                track={track} 
                key={track.id} 
                addTrack={this.props.addTrack} 
                removeTrack={this.props.removeTrack} 
                isRemoval={this.props.isRemoval}/>
            })
            }
        </div>
        )
    }
}