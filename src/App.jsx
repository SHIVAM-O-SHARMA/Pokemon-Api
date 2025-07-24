import './App.css'
import { useState,useRef } from 'react'

function App(){

  const [pokemon,setPokemon]= useState([]);
  const [category,setCategory]= useState("");
  const [loading,setLoading]= useState(false);
  const [nameCondition,setNameCondition]= useState(false);
  const inputRef= useRef(null);
  const inputRef1= useRef(null);

  async function PokemonByName(){
    setLoading(true);
    setNameCondition(true);
    
    const fetched1=[];
    const pokeName= inputRef1.current.value.toLowerCase();
    
    if (!pokeName) {
      alert("Please enter a Pokémon name");
      setLoading(false);
      setNameCondition(false);
      return;
    }

    try{
    const data= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    const convertedData= await data.json();
    fetched1.push(convertedData);
    setPokemon(fetched1);
    }catch(error){
      console.log(error);
      setPokemon([]);
      alert(error.message);
    }
    finally{
      setNameCondition(false);
      setLoading(false);
    }
  }
  
  async function GetPokemon(){
  const fetched=[];
  const count= Number(inputRef.current.value);

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
  <div className='min-h-screen bg-gradient-to-r from-purple-950 to-purple-600 pb-9'>
    <h1 className='text-[55px] font-bold text-center p-7 text-gray-300'>Pokemon Cards</h1>
    <div className='flex sm:flex-row space-y-2 sm:space-y-0 flex-col items-center justify-center p-7 m-5 space-x-6 bg-gray-300 rounded-2xl max-w-4xl mx-auto w-full'>
    <input type="number" placeholder='  Number of cards' className='rounded bg-slate-700 text-gray-300 h-11 sm:w-15 w-full' ref={inputRef} />
    <select
  value={category}
  onChange={(e)=> setCategory(e.target.value)}
  className='rounded bg-slate-700 text-gray-300 h-11 sm:w-35 w-full'>
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
    <input ref={inputRef1} type="text" placeholder='  Enter name' className='rounded bg-slate-700 text-gray-300 h-11 w-full sm:w-35' />
    <button onClick={PokemonByName} className='bg-red-500 text-gray-200 hover:bg-gray-200 hover:text-red-500 hover:border-1 hover:cursor-pointer border-red-500 transition-all duration-200 rounded w-full h-11 sm:w-35'>Search By Name</button>
    <button onClick={GetPokemon} className='bg-red-500 text-gray-200 hover:bg-gray-200 hover:text-red-500 hover:border-1 hover:cursor-pointer border-red-500 transition-all duration-200 rounded h-11 sm:w-25 w-full' disabled={loading}>{loading ? 'Loading..' : 'Show cards'}</button>
    <button onClick={DeletePokemon} className='bg-red-500 text-gray-200 hover:bg-gray-200 hover:text-red-500 hover:border-1 hover:cursor-pointer border-red-500 transition-all duration-200 rounded h-11 sm:w-25 w-full'>Clear all</button>
    </div> 

    {loading && 
    <div className='fixed inset-0 bg-black/70 z-70 flex justify-center items-center pt-6'>
    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Poké_Ball_icon.svg"
         alt="loading pokemon" className='animate-spin w-20 h-20' />
    </div> }
    
  {nameCondition ? (pokemon.length > 0 ? (
    pokemon.map((p) => (
      <div key={p.id || p.name} className='items-center'>
        <div>
          <h1>{p.name}</h1>
          <img src={p.sprites.other['official-artwork'].front_default} className='w-70 h-68' />
        </div>
      </div>
    ))
  ) : (
    <div>No such pokemon exists</div>
  )
) : null}

    <div className='flex flex-wrap gap-6 justify-center pt-7'>
      {pokemon && pokemon.length>0 ? (
        pokemon.map((p) => (
        <div key={p.id || p.name} className='transform hover:scale-105 transition hover:cursor-pointer duration-150 bg-white rounded-2xl p-2 sm:w-[320px] w-[240px] shadow'>
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