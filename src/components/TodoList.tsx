import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';

const TodoList = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [text, setText] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl p-6 transition-colors">
      <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">Todo List</h2>
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group border border-zinc-100 dark:border-zinc-700/50">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 accent-blue-500 cursor-pointer flex-shrink-0"
              />
              <span
                className={`cursor-pointer select-none truncate ${todo.completed ? 'line-through text-zinc-400 dark:text-zinc-600' : 'text-zinc-700 dark:text-zinc-300'}`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2 px-2"
              aria-label="Delete todo"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleAddTodo} className="mt-4 relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New todo"
          autoComplete="off"
          data-1p-ignore
          className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 p-2 pr-10 rounded w-full focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button 
          type="submit" 
          className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors flex items-center justify-center"
          aria-label="Add todo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default TodoList;