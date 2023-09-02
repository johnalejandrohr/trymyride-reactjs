import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addPlace } from '../redux/placesSlice';

// import Search from "./components/Search";
import Map from "../components/Map";
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { CiSearch } from "react-icons/ci";


function App() {
    const dispatch = useDispatch();
    const places = useSelector((state) => state.places)

    const [inputSearch, setInputSearch] = useState('');
    const [error, setError] = useState(null);

    const searchPlace = () => {
        fetchData(inputSearch);
    }
    const fetchData = async (qsearch) => {
        try {
          const response = await axios.get('https://nominatim.openstreetmap.org/search?q='+qsearch+'&format=json');
          dispatch(addPlace(response.data))
        } catch (error) {
          setError(error.message);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className='m-5 flex flex-col md:flex-row gap-2 relative'>
                <div className='w-full h-screen flex flex-col gap-2 '>
                    {/* Search */}
                    <div className='w-full bg-green p-3 rounded-md bg-white flex gap-2 justify-center items-center'>
                        <div className="w-full">
                            <input type="text" value={inputSearch} placeholder="Search places" className="border w-full h-9 p-2 text-gray-700"
                                onChange={(e) => setInputSearch(e.target.value)}
                            />
                        </div>
                        <div className='text-slate-800 hover:text-green-500 cursor-pointer'
                            onClick={() => {searchPlace()}}
                        >
                            <CiSearch size="2em"/>
                        </div>
                    </div>
                    {/* \search */}
                    <div className='w-full h-full p-2 rounded-md'>
                        <Map />
                    </div>
                </div>
                <div className='w-full md:w-5/12 bg-white rounded-md p-2'>
                    <p className='mb-2 w-full h-14 text-slate-800 tracking-wider font-bold uppercase rounded-md flex justify-center items-center'>Places</p>
                    <ul className='flex flex-col gap-2'>
                        {
                            places.places.map((item, index) => {
                                const {place_id, name, display_name, lat, lon} = item;
                                return(
                                    <li key={index} className='flex flex-col gap-2 w-full min-h-14 p-2 bg-slate-200 rounded-md justify-start items-start'>
                                        <span className='font-bold'>{name}</span>
                                        {display_name}
                                        <span>lat: {lat} - lon: {lon}</span>
                                        <Link to={`/details/${place_id}`} className='text-indigo-600 cursor-pointer p-2 border'>show details</Link>
                                    </li>
                                );
                            })
                        }
                        {
                            !places.places.length ? 
                            <li className='flex flex-col gap-2 w-full min-h-14 p-2 rounded-md justify-start items-start'>
                                No data.
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
