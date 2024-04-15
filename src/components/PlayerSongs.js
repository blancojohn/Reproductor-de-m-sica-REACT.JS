import React, { useState, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { IoPlayBack, IoPlayForward } from "react-icons/io5"


const PlayerSongs = () => {
    const [storedSongs, setStoredSongs]= useState([])
    const [listenSong, setListenSong]= useState(0) 
    const songRef= useRef(null)
    
    
    const getSongs = () => {
        fetch('https://playground.4geeks.com/sound/songs')
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

    const handleSelectSong= (url, id)=>{
        const urlApi= 'https://playground.4geeks.com' + url

        console.log("debe ser:",url, id)
        songRef.current.src=urlApi
        console.log(songRef.current.src)
        setListenSong(id) 
        handlePlay() 
    }

    const handlePlay= ()=>{
        songRef.current.play()
    }  

    useEffect(() => {
        getSongs()
    },[])
    
    return (
        <> 
            <div className="container">
                <audio ref={songRef}/>
                <button onClick={()=>handlePlay(listenSong)}>
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
                            storedSongs.map(({id, name, url})=>{/* Renderizo cada canción con la propiedad name. La url obtenida es de la canción */
                                return <button type='button' className='btn btn-outline-secondary' onClick={()=>{handleSelectSong(url, id), handlePlay()}} key={id}>{name}</button>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default PlayerSongs
    
    
            

                            
                                
                            
                        

            

        
