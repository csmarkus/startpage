import { useNotes } from '../hooks/useNotes';

const Notes = () => {
  const { notes, addNote, updateNote, deleteNote, toggleNote } = useNotes();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl p-6 flex flex-col transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">Notes</h2>
        <button 
          onClick={addNote}
          className="bg-blue-600 hover:bg-blue-500 p-1.5 rounded transition-colors flex items-center justify-center text-white"
          aria-label="Add note"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
      
      <div className="flex flex-col gap-3">
        {notes.map(note => (
          <div key={note.id} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3 border border-zinc-200 dark:border-zinc-700/50 transition-all">
            <div className="flex items-center gap-2 mb-2">
               <button 
                 onClick={() => toggleNote(note.id)} 
                 className="text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors p-1"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform duration-200 ${note.isExpanded ? 'rotate-90' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
               </button>
               <input 
                 type="text"
                 value={note.title}
                 onChange={(e) => updateNote(note.id, 'title', e.target.value)}
                 placeholder="Note Title"
                 className="bg-transparent text-zinc-800 dark:text-zinc-200 font-semibold placeholder-zinc-400 focus:outline-none w-full text-sm"
                 data-1p-ignore
                 autoComplete="off"
               />
               <button 
                 onClick={() => deleteNote(note.id)} 
                 className="text-red-400 hover:text-red-500 opacity-50 hover:opacity-100 transition-opacity p-1"
                 aria-label="Delete note"
               >
                 &times;
               </button>
            </div>
            
            {note.isExpanded && (
              <textarea
                value={note.content}
                onChange={(e) => updateNote(note.id, 'content', e.target.value)}
                placeholder="Type details here..."
                className="w-full bg-white dark:bg-zinc-950 rounded-lg p-3 text-sm text-zinc-700 dark:text-zinc-300 placeholder-zinc-400 focus:outline-none focus:bg-white dark:focus:bg-zinc-950 transition-colors resize-none min-h-[120px] block border border-zinc-200 dark:border-zinc-700 focus:border-blue-500"
                data-1p-ignore
                autoComplete="off"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
