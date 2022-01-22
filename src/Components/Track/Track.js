import './Track.css'
import React from 'react'

export class Track extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddTrack = this.handleAddTrack.bind(this)
        this.handleRemoveTrack = this.handleRemoveTrack.bind(this)
    }
    
    handleAddTrack() {
        this.props.addTrack(this.props.track)
    }

    handleRemoveTrack() {
        this.props.removeTrack(this.props.track)
    }

    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.handleRemoveTrack}>-</button>
        } else {
            return <button className="Track-action" onClick={this.handleAddTrack}>+</button>
        }
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.title}</h3>
                    <p>{this.props.track.album} | {this.props.track.artist}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}