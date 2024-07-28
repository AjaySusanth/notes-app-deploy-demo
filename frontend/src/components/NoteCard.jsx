import {MdOutlinePushPin } from 'react-icons/md'
import {MdCreate,MdDelete } from 'react-icons/md'
const NoteCard = ({ title, date, content, tag, isPinned, onEdit, onDelete, onPinNote }) => {
    return (
        <div className='bg-white border rounded p-4 hover:shadow-xl transition-all ease-in-out'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className="text-sm font-medium">{title}</h6>
                    <p className="text-xs text-slate-400">{date}</p>
                </div>
                <MdOutlinePushPin
                className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
                onClick={onPinNote}/>
            </div>

            <p className='text-xs text-slate-600 mt-2'>{content?.slice(0,60)}</p>
            <div className='flex items-center justify-between mt-2'>
                <div className="text-xs text-slate-400">{tag}</div>
                <div className='flex items-center gap-2'>
                    <MdCreate className='icon-btn hover:text-green-600' onClick={onEdit}/>
                    <MdDelete className='icon-btn hover:text-red-500' onClick={onDelete}/>
                </div>
            </div>

        </div>
    )
}
export default NoteCard