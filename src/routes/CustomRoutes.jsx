import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Pokedex from '../components/Pokedex/Pokedex'
import PokemonDetails from '../components/PokemonDetails/PokemonDetails'

// this component is for "enabling react-router"
const CustomRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Pokedex/>} />
      <Route path='/pokemon/:id' element={<PokemonDetails/>} />
    </Routes>
  )
}

export default CustomRoutes
