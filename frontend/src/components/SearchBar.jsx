import {FaMagnifyingGlass} from 'react-icons/fa6';
import {IoMdClose} from 'react-icons/io'

const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {
  return (
    <div>
        <div className="w-80 flex items-center bg-slate-100 rounded-md px-4">
            <input
            type="text"
            placeholder="Search Notes"
            value={value}
            onChange={onChange}
            className="w-full text-xs bg-transparent py-[11px] outline-none"
            />
            {value && (
                <IoMdClose className='text-xl text-slate-500 hover:text-black cursor-pointer mr-3' onClick={onClearSearch}/>
            )}
            <FaMagnifyingGlass className='text-slate-400 hover:text-black cursor-pointer' onClick={handleSearch}/>
        </div>

    </div>
  )
}
export default SearchBar