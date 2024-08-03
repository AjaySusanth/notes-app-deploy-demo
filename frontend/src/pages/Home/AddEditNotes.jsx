import { useState } from "react"
import TagInput from "../../components/TagInput"
import { MdClose } from "react-icons/md"
import axiosInstance from "../../utils/axiosInstance"

const AddEditNotes = ({onClose,noteData,type,getAllNotes}) => {

    const [title,setTitle] = useState(noteData?.title || '')
    const [content,setContent] = useState(noteData?.content || '')
    const [tags,setTags] = useState(noteData?.tags || [])
    const [error,setError] = useState(null)

    //Add note

    const addNewNote = async() =>{
        try{
            const res = await axiosInstance.post('/add-note',{
                title,
                content,
                tags
            })

            if (res.data && res.data.note){
                getAllNotes()
                onClose()
            }
            
        }
        catch(err){
            if (err.response && err.response.data && err.response.data.message){
                setError(err.response.data.message)
            }
            else{
                setError('Internal Server Error')
            }
        }
    }

    //Edit Note
    const editNote = async() =>{
        const noteId = noteData._id
        try{
            const res = await axiosInstance.put('/edit-note/'+ noteId,{
                title,content,tags
            })

            if (res.data && res.data.note){
                getAllNotes()
                onClose()
            }

        }
        catch(err){
            if (err.response && err.response.data && err.response.data.message){
                setError(err.response.data.message)
            }
            else{
                setError('Internal Server Error')
                console.log(err)
            }
        }
    }


    const handleAddNote = () => {
        if(!title){
            setError('Please enter a title')
            return;
        }

        if(!content){
            setError('Please enter the content')
            return;
        }
        setError('')

        if (type==='edit'){
            editNote()
        }
        else{
            addNewNote()
        }
    }

  return (
    <div className="relative">
        <button
        className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-full absolute -top-3 -right-3"
        onClick={onClose}
        >
            <MdClose className="text-xl text-slate-400"/>
        </button>
        <div className="flex flex-col gap-2">
            <label className="input-label">Title</label>
            <input
            type="text"
            className="text-sm text-slate-950 outline-none"
            placeholder="Go to gym"
            value={title}
            onChange={({target})=> setTitle(target.value)}
            />
        </div>

        <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">Content</label>
            <textarea
            type="text"
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
            placeholder="Content"
            rows={10}
            value={content}
            onChange={({target})=> setContent(target.value)}
            />
        </div>

        <div className="mt-3">
            <label className="input-label">Tags</label>
            <TagInput tags={tags} setTags={setTags}/>
        </div>

        {error && (
            <p className="text-xs text-red-500 pt-4">{error}</p>
        )}

        <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
            {type ==='edit' ? 'UPDATE' : 'ADD'}
        </button>
    </div>
  )
}
export default AddEditNotes