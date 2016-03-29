
export async function removeTodo({ id }) {
  const { Todo } = this.model;
  const viewer = this.viewer;

  const deletedTodoId = await Todo.node(id).delete();
  return { deletedTodoId, viewer };
}
