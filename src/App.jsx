import React from 'react';
import Player from './components/Player';


const App = () => {
    fetch('https://playground.4geeks.com/sound/songs')
        .then((response)=> {
            console.log(response)
            return response.json()
        })
        .then((datos)=> {
            console.log(datos)
            datos
        })
        .catch((error)=> console.log(error))
    return (
        <>
            <Player />
        </>
    )
}

export default App;
        