
export async function addTodo({ text }) {
  const { Todo } = this.model;
  const viewer = this.viewer;

  const todo = await Todo.addNode({ text, complete: false });
  const todoEdge = await viewer.todos.addEdge(todo);

  return { todoEdge, viewer };
}
