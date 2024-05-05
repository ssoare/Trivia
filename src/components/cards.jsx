import { useState, useEffect } from "react"

export default function Cards() {
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=10')
    const [pokemon, setPokemon] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [prev, setPrev] = useState(null)
    const [next, setNext] = useState(null)

    const types = {
        'normal': 'border-gray-300',
        'fire': 'border-red-500',
        'water': 'border-blue-500',
        'electric': 'border-yellow-500',
        'grass': 'border-green-500',
        'ice': 'border-cyan-500',
        'fighting': 'border-red-500',
        'poison': 'border-purple-500',
        'ground': 'border-yellow-500',
        'flying': 'border-blue-500',
        'psychic': 'border-pink-500',
        'bug': 'border-lime-500',
        'rock': 'border-orange-500',
        'ghost': 'border-indigo-500',
        'dragon': 'border-violet-500',
        'dark': 'border-black',
        'steel': 'border-gray-500',
        'fairy': 'border-pink-500'
    }

    const typesES = {
        'normal': 'normal',
        'fire': 'fuego',
        'water': 'agua',
        'electric': 'electrico',
        'grass': 'planta',
        'ice': 'hielo',
        'fighting': 'lucha',
        'poison': 'veneno',
        'ground': 'tierra',
        'flying': 'volador',
        'psychic': 'psiquico',
        'bug': 'bicho',
        'rock': 'roca',
        'ghost': 'fantasma',
        'dragon': 'dragon',
        'dark': 'siniestro',
        'steel': 'acero',
        'fairy': 'hada'
    }

    const button = 'bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded my-4'


    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const pokemonPromises = data.results.map(el => fetch(el.url).then(res => res.json()))
                Promise.all(pokemonPromises) 
                    .then(data => setPokemon(data))
                setNext(data.next)
                setPrev(data.previous)
                setTotalPages(Math.floor(data.count / 10))
            })
    }, [currentPage])

    return (
        <>
            <section className="flex flex-wrap gap-4 p-4 text-center">
                {pokemon.map(el => { return (
                    <article className="border-2 rounded-md shadow-md p-4 flex flex-col gap-4 w-[220px] cursor-pointer"
                    key={el.id}>
                        <h1 className="capitalize text-xl font-bold">
                            {el.name}
                        </h1>
                        <img className="size-32 mx-auto"
                        src={el.sprites.other.dream_world.front_default} alt={el.name} />
                        <div className="flex justify-center gap-4">
                            {el.types.map((type, index) => { return (
                                <p className={`border-2 py-1 px-4 rounded-full ${types[type.type.name]}`} 
                                key={index}>
                                    {typesES[type.type.name]}
                                </p>
                            )})}
                        </div>
                    </article>
                )})}
            </section>
            <section className="flex justify-center items-center gap-2 my-4">
                <button onClick={() => {
                    setCurrentPage(1)
                    setUrl('https://pokeapi.co/api/v2/pokemon?limit=10')
                }}
                className={button}>
                    Inicio
                </button>
                <button onClick={() => {
                    currentPage > 1 &&
                    setCurrentPage(currentPage - 1)
                    setUrl(prev)
                }}
                className={button}>
                    Anterior
                </button>
                <button className={button}>
                    {currentPage}
                </button>
                <button onClick={() => {
                    currentPage < totalPages &&
                    setCurrentPage(currentPage + 1)
                    setUrl(next)
                }}
                className={button}>
                    Siguiente
                </button>
                <button onClick={() => {
                    setCurrentPage(totalPages)
                    setUrl(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(totalPages) * 10}`)
                }}
                className={button}>
                    Final
                </button>
            </section>
        </>
    )
}