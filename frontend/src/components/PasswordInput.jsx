import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
const PasswordInput = ({ value, onChange, placeholder }) => {

    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="flex items-center mb-3 border-[1.5px] rounded px-5 ">
            <input
                value={value}
                type={showPassword ? 'text' : 'password'}
                onChange={onChange}
                placeholder={placeholder || 'Password'}
                className="w-full py-3 text-sm bg-transparent outline-none mr-3"
            />
            {showPassword ?
                <FaRegEye size={22} className="text-primary cursor-pointer" onClick={() => toggleShowPassword()} />
                :
                <FaRegEyeSlash size={22} className="text-slate-400 cursor-pointer" onClick={() => toggleShowPassword()} / >
            }
        </div>

    )
}
export default PasswordInput