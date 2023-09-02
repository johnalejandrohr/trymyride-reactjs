import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { AiOutlineArrowLeft } from "react-icons/ai";

function MapViewDetails() {
    const places = useSelector((state) => state.places)
    const [place, setPlace] = useState({
        place_id:'',
        name:'',
        display_name:'',
        lat:'',
        lon:'',
        type:'',
        place_rank:'',
        class:'',
    });
    const { id } = useParams();

    useEffect(() => {
        if(id) {
            console.log(places, id);
            setPlace(places.places.find(place => place.place_id === parseInt(id))); 
        }
    }, [])

    return(
        <div className='w-full flex flex-col'>
            <nav className='m-3 p-2 flex items-center gap-3 bg-white rounded-md shadow'>
                <button onClick={() => window.history.back()} className='text-indigo-600 font-bold cursor-pointer p-2'>
                    <AiOutlineArrowLeft  size='1.3em'/>
                </button>
                <p className='text-slate-800'>Details</p>
            </nav>
            <div className=' bg-white rounded-md m-3 p-2 shadow'>
                <div className='grid grid-cols-1 gap-2 w-full'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2'>
                            <p className='font-bold w-1/4'>Id:</p>
                            <p className='w-full text-justify'>{place.place_id}</p>
                        </div>
                        <div className='flex gap-2'>
                            <p className='font-bold w-1/4'>Name:</p>
                            <p className='w-full text-justify'>{place.name}</p>
                        </div>
                        <div className='flex gap-2'>
                            <p className='font-bold w-1/4'>Display Name:</p>
                            <p className='w-full text-justify'>{place.display_name}</p>
                        </div>
                        <div className='flex gap-2'>
                            <p className='font-bold w-1/4'>Coordinates:</p>
                            <div className='w-full'>
                                <p className='w-full text-justify'>Lat: {place.lat}</p>
                                <p className='w-full text-justify'>Long: {place.lon}</p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <p className='font-bold w-1/4'>Type:</p>
                            <p className='w-full text-justify'>{place.type}</p>
                        </div>
                        <div className='flex gap-2'>
                            <p className='font-bold w-1/4'>Rank:</p>
                            <p className='w-full text-justify'>{place.place_rank}</p>
                        </div>
                        <div className='flex gap-2'>
                            <p className='font-bold w-1/4'>Class:</p>
                            <p className='w-full text-justify'>{place.class}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );

}

export default MapViewDetails
