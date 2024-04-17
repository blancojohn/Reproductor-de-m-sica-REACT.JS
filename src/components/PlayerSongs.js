import React, { useState, useEffect, useRef } from "react";
import { IoPlayBack, IoPlayForward, IoPause, IoPlay } from "react-icons/io5"


const PlayerSongs = () => {
    const [storedSongs, setStoredSongs]= useState([])
    const [selectedSong, setSelectedSong]= useState(0)
    const [changeButton, setchangeButton]= useState(false) 
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
        setSelectedSong(id)
        setchangeButton(true) 
        handlePlay() 
    }

    const handlePlay= ()=>{
        songRef.current.play()
    }  

    const handlePause= ()=>{
        songRef.current.pause()
    }

    useEffect(() => {
        getSongs()
    },[])
    
    return (
        <> 
            <div className="container">
                <audio ref={songRef}/>
                <button>
                    <IoPlayBack size={50}/>
                </button>
                {
                    <button onClick={()=>setchangeButton(!changeButton)}>{changeButton ? <IoPause size={50} onClick={()=>handlePause()}/> : <IoPlay size={50} onClick={()=>handlePlay()}/>}</button>
                }       
                <button>
                    <IoPlayForward size={50} />
                </button>
                
                <div className='d-grid col-3 mx-auto'>
                    {
                        Array.isArray(storedSongs) && storedSongs.length > 0 &&
                            storedSongs.map(({id, name, url})=>{/* Renderizo cada canción con la propiedad name. La propiedad url obtenida es de la canción */
                                return <button type='button' className='btn btn-outline-secondary' onClick={()=>{handleSelectSong(url, id)}} key={id}>{name}</button>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default PlayerSongs
    
    
            

                            
                                
                            
                        

            

        
                    
                    
