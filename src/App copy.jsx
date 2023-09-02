import { useEffect, useState } from 'react';
// import Search from "./components/Search";
import Map from "./components/Map";
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { CiSearch } from "react-icons/ci";


function App() {
    const [search, setSearch] = useState('');
    const [inputSearch, setInputSearch] = useState('');
    const [data, setData] = useState([]);
    const [places, setPlaces] = useState([]);
    const [placesA, setPlacesA] = useState([0,0]); // ([4.5854102, -74.1012769]);
    const [error, setError] = useState(null);

    const searchPlace = () => {
        setSearch(inputSearch);
        fetchData();
    }
    const fetchData = async () => {
        try {
            setData([])
          const response = await axios.get('https://nominatim.openstreetmap.org/search?q='+search+'&format=json');
          setData(response.data);
            const aux = response.data.map(({lat, lon, name}) => {
                return {lat, lon, name};
            })
            setPlacesA([4.5854102, -74.1012769]);

            setPlaces(aux);
        } catch (error) {
          setError(error.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleClick = (lat, lon) => {
        setPlacesA([lat, lon]);
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='m-5 flex flex-col md:flex-row gap-2 relative'>
                <div className='w-full h-screen flex flex-col gap-2'>
                    <div className='w-full bg-green p-3 rounded-md bg-white flex gap-2 justify-center items-center'>
                        <div className="w-full">
                            <input type="text" value={inputSearch} placeholder="Buscar lugares" className="border w-full h-9 p-2 text-gray-700"
                                onChange={(e) => setInputSearch(e.target.value)}
                            />
                        </div>
                        <div className='text-slate-800 hover:text-green-500 cursor-pointer'
                            onClick={() => {searchPlace()}}
                        >
                            <CiSearch size="2em"/>
                        </div>
                    </div>
                    <div className='w-full h-full bg-white p-2 rounded-md'>
                        <Map places={places} placesA={placesA} data={data}/>
                    </div>
                </div>
                <div className='w-full md:w-5/12 bg-white rounded-md p-2'>
                    <p className='mb-2 w-full h-14 text-slate-800 tracking-wider font-bold uppercase rounded-md flex justify-center items-center'>Lugares</p>
                    <ul className='flex flex-col gap-2'>
                        {
                            data.map((item, index) => {
                                const {name, display_name, lat, lon} = item;
                                return(
                                    <li onClick={()=>handleClick(lat, lon)} key={index} className='flex flex-col gap-2 w-full min-h-14 p-2 bg-slate-200 rounded-md justify-start items-start cursor-pointer hover:bg-slate-300'>
                                        <span className='font-bold'>{name}</span>
                                        {display_name}
                                        <span>lat: {lat} - lon: {lon}</span>
                                    </li>
                                );
                            })
                        }
                        {
                            !data.length ? 
                            <li className='flex flex-col gap-2 w-full min-h-14 p-2 rounded-md justify-start items-start'>
                                No existen datos. Cargando...
                            </li>
                            :null
                        }
                    </ul>
                </div>
            </div>
        </>
  )
}

export default App
