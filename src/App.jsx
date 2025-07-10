import './App.css'
import { useRef, useState} from 'react'

function App(){
  
 const [pokemon,setPokemons]=useState([]);
 const inputRef= useRef(null);

 function DeletePokemon() {
  setPokemons([]);
 }

 async function Getpokemon() {
  const count=Number(inputRef.current.value);
  const fetched=[];

  try {
    for(let i=1;i<=count;i++){
    const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data= await res.json();
    fetched.push(data);
  }
  setPokemons(fetched);
  }catch(err){
    console.error(err);
  }
  }

return <div>
<input type="number" placeholder='number' className='bg-amber-200' ref={inputRef}/>
<input type="text" placeholder='category' className='bg-amber-200'/>
<button onClick={Getpokemon} className='bg-amber-200 border-2 border-gray-400 px-4'>show cards</button>
<button onClick={DeletePokemon} className='bg-amber-200 border-2 border-gray-400 px-4'>clear all</button>

{pokemon && pokemon.length>0 ? (
pokemon.map((p)=> (
<div key={p.id}>
  <h1>{p.name} </h1>
  <img src={p.sprites.other['official-artwork'].front_default} className='w-50 h-50' />
</div>
))
) :(<div>no pokemon</div> )}
</div>
}

export default App;