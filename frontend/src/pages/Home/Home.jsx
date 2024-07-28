import { MdAdd } from 'react-icons/md'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/NoteCard'
const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title='Hello'
            date='31 Apr 2024'
            content='Hii hello , how u doin'
            tag='#greeting'
            isPinned={true}
            onEdit={()=>{}}
            onDelete={()=>{}}
            onPinNote={()=>{}}
            />
        </div>
      </div>

      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={()=>{}}>
        <MdAdd className=' text-white text-[32px]'/>
      </button>
    </>
  )
}
export default Home