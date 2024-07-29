import { useState } from "react"
import TagInput from "../../components/TagInput"
import { MdClose } from "react-icons/md"

const AddEditNotes = ({onClose,noteData,type}) => {

    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [tags,setTags] = useState([])
    const [error,setError] = useState(null)

    //Add note

    const addNewNote = async() =>{}

    //Edit Note
    const editNote = async() =>{}


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
            Add
        </button>
    </div>
  )
}
export default AddEditNotes