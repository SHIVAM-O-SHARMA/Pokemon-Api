import './App.css'
import { useState,useRef } from 'react'

function App(){

  const [pokemon,setPokemon]= useState([]);
  const [category,setCategory]= useState("");
  const [loading,setLoading]= useState(false);
  const inputRef= useRef(null);

  async function GetPokemon(){
  const count= Number(inputRef.current.value);
  const fetched=[];

  try{
  setLoading(true);
  if(category === ""){
  for(let i=1;i<=count;i++){
  const data= await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  const convertedData= await data.json();
  fetched.push(convertedData);
  }
  setPokemon(fetched);
  } 
else{
  const typeData= await fetch(`https://pokeapi.co/api/v2/type/${category.toLowerCase()}`);
  const ConvertedTypeData= await typeData.json();
  const pokemonOfType= ConvertedTypeData.pokemon;

  const shuffled= pokemonOfType.sort(()=> 0.5 - Math.random());

  // shuffling done on purpose
  for(let i=0; i<Math.min(count, shuffled.length);i++){
    const pokeUrl= shuffled[i].pokemon.url;
            const pokeData= await fetch(pokeUrl);
            const pokeJson= await pokeData.json();
            fetched.push(pokeJson);
  }
  setPokemon(fetched);
}
 
} catch(error){
  console.error(error);
  alert('Error fetching pokemon data');
}
finally{
  setLoading(false);
}
}

function DeletePokemon(){
  setPokemon([]);
}

  return (
  <div>
    <h1 className='text-[50px] text-center p-10'>Pokemon Cards</h1>
    <div className='flex justify-center m-5 p-5 space-x-6 bg-gray-400'>
    <input type="number" placeholder='number' className='rounded bg-amber-200' ref={inputRef} />
  <select
  value={category}
  onChange={(e)=> setCategory(e.target.value)}
  className='rounded bg-amber-200'>
  <option value="">Select Category</option>
  <option value="fire">Fire</option>
  <option value="water">Water</option>
  <option value="grass">Grass</option>
  <option value="electric">Electric</option>
  <option value="bug">Bug</option>
  <option value="normal">Normal</option>
  <option value="poison">Poison</option>
  <option value="ground">Ground</option>
  <option value="fairy">Fairy</option>
  <option value="psychic">Psychic</option>
  <option value="fighting">Fighting</option>
  <option value="rock">Rock</option>
  <option value="ghost">Ghost</option>
  <option value="dark">Dark</option>
  <option value="ice">Ice</option>
  <option value="dragon">Dragon</option>
  <option value="steel">Steel</option>
  <option value="flying">Flying</option>
  </select>  
      <button onClick={GetPokemon} className='bg-red-300 rounded w-25 h-8' disabled={loading}>{loading ? 'Loading..' : 'Show cards'}</button>
      <button onClick={DeletePokemon} className='bg-red-300 rounded w-23 h-8'>Clear all</button>
    </div>

    {loading && 
    <div className='fixed inset-0 bg-black/50 z-70 flex justify-center items-center p-7'>
    <div className='w-14 h-14 rounded-full animate-spin border-4 border-blue-400 border-dashed'></div>
    </div> }    

    <div className='flex flex-wrap gap-4 justify-center'>
      {pokemon && pokemon.length>0 ? (
        pokemon.map((p) => (
        <div key={p.id || p.name} className='bg-white rounded p-2 shadow'>
        <h1 className='font-semibold font-sans text-[22px]'>{p.name}</h1>
        <h2 className='text-[17px]'>{p.name}</h2>
        <img src={p.sprites.other['official-artwork'].front_default} className='w-70 h-68' alt="pic" />
        </div>
      ))
    ):( <div className='translate-y-10'>No Pokemon available to show!</div> )}
    </div>
    </div>
  )
}

export default App;