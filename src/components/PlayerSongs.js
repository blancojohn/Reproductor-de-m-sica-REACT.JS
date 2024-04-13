import React, { useState, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { IoPlayBack } from "react-icons/io5"
import { IoPlayForward } from "react-icons/io5";


const PlayerSongs = () => {
    const urlApi= 'https://playground.4geeks.com/sound/songs'
    const [storedSongs, setStoredSongs]= useState([])
    const songRef= useRef(null)
    
    
    const getSongs = () => {
        const urlApi= 'https://playground.4geeks.com/sound/songs'
        fetch(urlApi)
        .then((response) => {
            console.log(response)
            return response.json()
        })
        .then((datos) => {
            console.log(datos)
            setStoredSongs(datos.songs)/* Songs es la propiedad del objeto de la API y valor es un array 
            de canciones las cuales son almacenadas en el estado */
        })
        .catch((error) => console.log(error))
    }

    const handleSelectSong= (url)=>{
        console.log(url)
        songRef.current.url=urlApi+url
        console.log(songRef.current.url)
        songRef.current.play()
    }

    useEffect(() => {
        getSongs()
    },[])
    
    return (
        <>  
            <button>
                <IoPlayBack size={50} />
            </button>
            <button>
                <FaPlay size={50} />
            </button>
            <button>
                <IoPlayForward size={50} />
            </button>
            
            <div className='d-grid col-3 mx-auto'>
                {
                    Array.isArray(storedSongs) && storedSongs.length > 0 &&
                        storedSongs.map(({id, url, name})=>{/* Renderizo cada canción con la propiedad name. */
                            return <button type='button' className='btn btn-outline-secondary' onClick={()=>{handleSelectSong(url)}} key={id} >{name}</button>
                    })
                }
            </div>
            <audio ref={songRef} onClick={()=>handleSelectSong()} controls/>
        </>
    )
}

export default PlayerSongs
    
    
            

                            
                                
                            
                        

            

