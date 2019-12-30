import React from 'react';
import './Track.css';

export const Track = ({isRemoval, track, onAdd, onRemove}) => {
    const {name, artist, album} = track

    const renderAction = () => {
        if (isRemoval) {
            return <button className="Track-action" 
                            onClick={removeTrack}>-</button>
        } else {
            return <button className="Track-action" 
                            onClick={addTrack}>+</button>
        }
    }

    const addTrack = () => {
        onAdd(track);
    }

    const removeTrack = () => {
        onRemove(track);
    }

    return (
        <div className="Track">
            <div className="Track-information">
                <h4>{name}</h4>
                <p>{artist} | {album}</p>
            </div>
            {renderAction()}
        </div>
    )

}