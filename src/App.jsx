import './App.css'
import { useState,useRef } from 'react'

function App(){

  const [pokemon,setPokemon]= useState([]);
  const inputRef= useRef(null);

  async function GetPokemon(){

  const count= Number(inputRef.current.value);
  const fetched=[];

  try{
  for(let i=1;i<=count;i++){
  const data= await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  const convertedData= await data.json();
  fetched.push(convertedData);
  }
  setPokemon(fetched);
  } catch(error){
  console.error(error);
}
}

function DeletePokemon(){
  setPokemon([]);
}

  return (
    <div>
    
    <div className='flex justify-center pt-5 space-x-6 bg-gray-400 pb-5'>
      <input type="number" placeholder='number' className='rounded bg-amber-200' ref={inputRef} />
      <input type="text" placeholder='category' className='rounded bg-amber-200' />
      <button onClick={GetPokemon} className='bg-red-300 rounded w-25 h-8'>Show cards</button>
      <button onClick={DeletePokemon} className='bg-red-300 rounded w-23 h-8'>Clear all</button>
    </div>

    <div className='flex space-x-5 justify-center'>
      {pokemon && pokemon.length>0 ? (
      
      pokemon.map((p) => (
        <div key={p.id} className='bg-white rounded p-2 shadow'>
          <h1 className='font-bold font-sans text-[22px]'>{p.name}</h1>
          <h2 className='font-semibold font-sans text-[17px]'>{p.name}</h2>
          <img src={p.sprites.other['official-artwork'].front_default} className='w-70 h-68' alt="pic" />
        </div>
      ))
    ):( <div>No Pokemon available to show!</div> )}
    </div>
    </div>
  )
}

export default App;