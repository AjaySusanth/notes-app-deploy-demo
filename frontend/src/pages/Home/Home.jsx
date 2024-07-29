import { MdAdd } from 'react-icons/md'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/NoteCard'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useState } from 'react'
const Home = () => {

  const [openModal,setOpenModal] = useState({
    isShown:false,
    type:'add',
    data:null
  })

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
      

      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={()=>{
        setOpenModal({isShown:true, type:"add",data:null})
      }}>
        <MdAdd className='text-white text-[32px]'/>
      </button>
      
      <Modal
      isOpen={openModal.isShown}
      onRequestClose={()=>{}}
      style={{
        overlay:{
          backgroundColor:"rgba(0,0,0,0.2)"
        },
      }}

      contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes 
        type={openModal.type}
        data={openModal.data}
        onClose={()=>{
          setOpenModal({isShown:false, type:"add",data:null})
        }}/> 
      </Modal>

    </>
  )
}
export default Home