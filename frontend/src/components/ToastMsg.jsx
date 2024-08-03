import {LuCheck} from 'react-icons/lu'
import { useEffect } from 'react'
import { MdOutlineDelete } from 'react-icons/md'

const ToastMsg = ({isShown,type,message,onClose}) => {

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            onClose()
        },3000)

        return ()=>{
            clearTimeout(timeout)
        }
    },[onClose])


  return (
    <div className={`absolute top-20 right-6 transition-all duration-300 ${isShown ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`min-w-52 bg-white border rounded-md shadow-2xl after:w-[5px] after:h-full after:absolute after:left-0  ${type==='delete'? 'after:bg-red-500': 'after:bg-green-500'} after:top-0 after:rounded-l-lg`}>
            <div className="flex items-center gap-3 py-2 px-4">
                <div className={`w-10 h-10 flex justify-center items-center rounded-full ${type==='delete' ? 'bg-red-50' :'bg-green-50'}`}>
                    {type==='delete'? 
                        <MdOutlineDelete className='text-xl text-red-500'/> 
                        : <LuCheck className='text-xl text-green-500'/>}
                </div>
                <p className='text-sm text-slate-800'>{message}</p>
            </div>
        </div>
    </div>
  )
}
export default ToastMsg