import { MdAdd } from 'react-icons/md'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/NoteCard'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import ToastMsg from '../../components/ToastMsg'
import EmptyCard from '../../components/EmptyCard'
import addNotesImg from '../../assets/add-note.svg'
import noNotesImg from '../../assets/no-notes.svg'

const Home = () => {

  const [openModal,setOpenModal] = useState({
    isShown:false,
    type:'add',
    data:null
  })


  const handleEdit = async(noteDetails) => {
    setOpenModal({
      isShown:true,
      type:'edit',
      data:noteDetails
    })
  }

  const [userInfo,setUserInfo] = useState(null)
  const navigate = useNavigate()

  // get user api call

  const getUserInfo = async () =>{
    try{
      const res = await axiosInstance.get('/get-user')

      if (res.data && res.data.user){
        setUserInfo(res.data.user)
      }
    }
    catch(err){
      if (err.response.status === 401){
        localStorage.clear()
        navigate('/login')
      }
    }
  }
  
  const [allNotes,setAllNotes] = useState([])

    // get all notes api call
  const getAllNotes = async()=>{
    try{
      const res = await axiosInstance.get('/get-all-notes')

      if (res.data && res.data.notes){
        setAllNotes(res.data.notes)
      }
    }
    catch(err){
      console.log('An unexpected error occured')
    }
  }

  // delete note api call

  const deleteNote = async(data)=>{
    const noteId = data._id
    try{
        const res = await axiosInstance.delete('/delete-note/'+noteId)

        if (res.data && !res.data.error){
          showToastMessage('Note deleted successfully','delete')
          getAllNotes()
          onClose()
        }
    }
    catch(err){
      if (err.response && err.response.data && err.response.data.message){
        setError('An unexpected error occured, try again')
      }
    }
  }

  // search api

  const [isSearch,setIsSearch] = useState(false)

  const onSearch = async (query) =>{
    try{
      const res = await axiosInstance('/search-notes',{
        params:{query} //short hand for params:{query:query}
      })

      if(res.data && res.data.notes){
        setIsSearch(true)
        setAllNotes(res.data.notes)
      }
    }
    catch(err){
      console.log(err)
    }
  }

  const handleClearSearch = () =>{
    setIsSearch(false)
    getAllNotes()
  }

  const updateIsPinned = async (noteData) => {
    try{
      const res = await axiosInstance.put('/note-pinned/' + noteData._id,{
        isPinned :!noteData.isPinned
      })
      if (res.data && res.data.note){
        showToastMessage('Note pinned successfully')
        getAllNotes()
      }
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getAllNotes()
    getUserInfo();
    return ()=>{}
  },[])


  const [showToastMsg,setShowToastMsg] = useState({
    isShown:false,
    message:"",
    type:"add"
  })

  const showToastMessage = (message,type)=>{
    setShowToastMsg({
      isShown:true,
      message,
      type
    })
  }

  const handleCloseToast = ()=>{
    setShowToastMsg({
      isShown:false,
      message:""
    })
  }


  return (
    <>
      <Navbar userInfo={userInfo} onSearch={onSearch} handleClearSearch={handleClearSearch}/>
      <div className="container mx-auto">
        {allNotes.length>0 ?
        (
          <div className="grid grid-cols-3 gap-4 mt-8">

          {allNotes.map((item,index)=>(
              <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={()=> handleEdit(item)}
              onDelete={()=> deleteNote(item)}
              onPinNote={()=>updateIsPinned(item)}
              />
          ))}
          
          </div>
        )
          : (<EmptyCard img={isSearch ? noNotesImg : addNotesImg} message={isSearch ? 'No notes were found matching your search':'Add your First Note by clicking the add button. Lets get started'}/>)
        }
        
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
        noteData={openModal.data}
        onClose={()=>{
          setOpenModal({isShown:false, type:"add",data:null})
        }}
        getAllNotes={getAllNotes}
        showToast={showToastMessage}
        /> 
      </Modal>

      <ToastMsg
      isShown={showToastMsg.isShown}
      message={showToastMsg.message}
      type={showToastMsg.type}
      onClose={handleCloseToast}      
      />

    </>
  )
}
export default Home