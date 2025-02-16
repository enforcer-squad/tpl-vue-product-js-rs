import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  // state
  const todos = ref([]);
  const filter = ref('all');
  let defaultId = 1;

  // getters
  const filteredTodos = computed(() => {
    if (filter.value === 'all') {
      return todos.value;
    }
    return todos.value.filter(todo => todo.completed);
  });

  // actions
  function addTodo(todo) {
    todos.value.push({
      ...todo,
      id: defaultId++,
    });
  }

  function removeTodo(id) {
    todos.value = todos.value.filter(todo => todo.id !== id);
  }

  function updateTodo(id, value) {
    const todo = todos.value.find(todo => todo.id === id);
    if (todo) {
      todo.completed = value;
    }
  }

  function toggleFilter(newFilter) {
    filter.value = newFilter;
  }

  return {
    // state
    todos,
    filter,
    // getters
    filteredTodos,
    // actions
    addTodo,
    removeTodo,
    updateTodo,
    toggleFilter,
  };
});

export const filters = ['all', 'completed'];
