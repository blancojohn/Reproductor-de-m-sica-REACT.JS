import React, { useState, useEffect } from "react";

const PlayerSongs = () => {
    const [storedSongs, setStoredSongs]= useState([])

    useEffect(() => {
        getSongs()
    }, [])
    
    const getSongs = () => {
        fetch('https://playground.4geeks.com/sound/songs')
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((datos) => {
                console.log(datos)
                setStoredSongs(datos.songs)
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <h1>GetSongs</h1>
            <ul>
                {
                    Array.isArray(storedSongs) && storedSongs.length > 0 &&
                        storedSongs.map((song)=>{
                        return <li>{song.name}</li>
                    })
                }
            </ul>
        </>
    )
}

export default PlayerSongs