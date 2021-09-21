<template>
  <div>
    <h4>Todo List</h4>
    <ul>
      <li v-for="todo in todos" :key="todo.text">{{ todo.text }}</li>
    </ul>
    <h4>Done List</h4>
    <ul>
      <li v-for="done in dones" :key="done.text">{{ done.text }}</li>
    </ul>
    <p>
      <input
        type="text"
        v-model="newTodo.text"
        @keyup.enter="addTodo(newTodo)"
      />
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import { Todo } from './types';

@Component
export default class App extends Vue {
  @Getter public todos!: Todo[];
  @Getter public dones!: Todo[];

  @Mutation public addTodo!: void;
  public newTodo: Todo = {
    text: '',
    checked: false,
  };
}
</script>



<style>
html,
body {
  font-family: Helvetica;
  font-size: 1.25rem;
}
</style>
