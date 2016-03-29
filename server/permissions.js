
export function permissions() {
  return {
    // node permission returns 'Nodes' instance that specifies which nodes
    // are accessible to the current viewer
    async Todo() {
      const { Todo } = this.model;
      const viewer = this.viewer;

      if (viewer) {
        const viewerTodoIds = await viewer.todos.nodeIds();
        return Todo.filter({ id: { eq: viewerTodoIds } });
      }
    },

    async User() {
      const { User } = this.model;
      const viewer = this.viewer;

      if (viewer) {
        return User.filter({ id: { eq: viewer.id } });
      }
    },

    // mutation permission returns true if viewer is allowed to execute mutation
    addTodo: userIsLoggedIn,
    changeTodoStatus: userOwnsTodo,
    markAllTodos: userIsLoggedIn,
    removeCompletedTodos: userIsLoggedIn,
    removeTodo: userOwnsTodo,
    renameTodo: userOwnsTodo,
  };
}

async function userIsLoggedIn() {
  const viewer = this.viewer;
  if (viewer) {
    return true;
  }
}

async function userOwnsTodo({ id }) {
  const viewer = this.viewer;
  if (viewer) {
    return viewer.todos.edge(id).exists();
  }
}
