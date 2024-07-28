import ProfileInfo from "./ProfileInfo"
import {useNavigate} from 'react-router-dom'
import SearchBar from "./SearchBar";
import { useState } from "react";

const Navbar = () => {

  const [searchQuery,setSearchQuery] = useState('')

  const navigate = useNavigate;
  const onLogout = () => {
    navigate("/login")
  }

  const handleSearch =() => {

  }

  const onClearSearch = () => {
    setSearchQuery("")
  }
    return (
      <div className="flex items-center justify-between px-6 py-2 bg-white drop-shadow">
          <h2 className="text-xl font-medium text-black py-2">Notes</h2>
          <SearchBar
          value={searchQuery}
          onChange={({target})=>{
          setSearchQuery(target.value)
          }}
          onClearSearch={onClearSearch}
          handleSearch={handleSearch}
          />
          <ProfileInfo onLogout={onLogout}/>
      </div>
    )
  }
  export default Navbar