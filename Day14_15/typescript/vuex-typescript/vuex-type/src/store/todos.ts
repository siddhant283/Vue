import { State } from '../types';
import { GetterTree, MutationTree } from 'vuex';

export const state: State = {
    todos: [
        { text: 'Buy Milk', checked: false },
        { text: 'Go Shopping', checked: true },
        { text: 'Get Haircut', checked: true },
    ],
};


export const getters: GetterTree<State, any> = {
    todos: (state) => state.todos.filter((todo) => !todo.checked),
    dones: (state) => state.todos.filter((todo) => todo.checked),
};

export const mutations: MutationTree<State> = {
    addTodo(state, newTodo) {
      const todoCopy = Object.assign({}, newTodo);
      state.todos.push(todoCopy);
    },
  };

