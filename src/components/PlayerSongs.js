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

    const handleSelectSong= (song, index)=>{
        const urlApi= 'https://playground.4geeks.com' + song.url

        console.log("canción seleccionada:", song)
        songRef.current.src=urlApi
        console.log("Escuchando:",songRef.current.src)
        setSelectedSong(index)
        setchangeButton(true) 
        handlePlay() 
    }

    const handlePlay= ()=>{
        songRef.current.play()
    }  

    const handlePause= ()=>{
        songRef.current.pause()
    }

    const handlePlayBack= (selectedSong)=>{
        console.log('canción seleccionada', selectedSong)
        const backSong= selectedSong -1 < 0 ? storedSongs[storedSongs.length -1] : storedSongs[selectedSong -1]
        const urlApi= 'https://playground.4geeks.com' + backSong.url
        console.log('conacatenación', urlApi)
        songRef.current.src= urlApi
        console.log('Canción anterior',backSong)
        setSelectedSong(selectedSong -1 < 0 ? storedSongs.length -1 : storedSongs - 1)
        handlePlay()
    }

    const handlePlayForward= (selectedSong)=>{
        console.log('canción seleccionada:',selectedSong)
        const forwardSong= selectedSong +1 === storedSongs.length ? storedSongs[0] : storedSongs[selectedSong +1]
        const urlApi= 'https://playground.4geeks.com' + forwardSong.url
        songRef.current.src= urlApi
        console.log('Canción siguiente:', songRef.current.src)
        setSelectedSong(selectedSong +1 === storedSongs.length ? 0 : selectedSong +1)
        handlePlay() 
    }

    useEffect(() => {
        getSongs()
    },[])
    
    return (
        <> 
                
            <div className='d-grid col-2 mx-auto'>
                {
                    Array.isArray(storedSongs) && storedSongs.length > 0 &&
                        storedSongs.map((song, index)=>{/* Renderizo cada canción con la propiedad name. La propiedad url obtenida es de la canción */
                        return <button type='button' className='btn btn-outline-secondary' onClick={()=>{handleSelectSong(song, index)}} key={index}>{song.name}</button>
                    })
                }
            </div>
  
            <div className="d-flex justify-content-center">
                <audio ref={songRef}/>
                <button>
                    <IoPlayBack size={25} onClick={()=>handlePlayBack(selectedSong)}/>
                </button>
                {
                    <button onClick={()=>setchangeButton(!changeButton)}>{changeButton ? <IoPause size={25} onClick={()=>handlePause()}/> : <IoPlay size={25} onClick={()=>handlePlay()}/>}</button>
                }       
                <button>
                    <IoPlayForward size={25} onClick={()=>handlePlayForward(selectedSong)}/>
                </button>
            </div>
    </>
)
}

export default PlayerSongs
                                
    
    
            

                            
                                
                            
                        

            

        
                    
                    
