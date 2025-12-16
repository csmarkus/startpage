import { useLocalStorage } from './useLocalStorage';
import type { Todo } from '../types/todo';

const DEFAULT_TODOS: Todo[] = [
  { id: 1, text: 'Create a start page', completed: true },
  { id: 2, text: 'Add a todo list', completed: false },
];

/**
 * Custom hook for managing todos with localStorage persistence
 * @returns Todos state and CRUD operations
 */
export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', DEFAULT_TODOS);

  const addTodo = (text: string) => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
