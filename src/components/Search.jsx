import { CiSearch } from "react-icons/ci";

const Search = () => {
    return (
        <>
            <div className='w-full bg-green p-3 rounded-md bg-white flex gap-2 justify-center items-center'>
               <div className="w-full">
                    <input type="text" placeholder="Buscar lugares" className="border w-full h-9 p-2 text-gray-700"/>
               </div>
               <div className='text-slate-800 hover:text-green-500 cursor-pointer'>
                    <CiSearch size="2em"/>
               </div>
            </div>
        </>
      )
}

export default Search
