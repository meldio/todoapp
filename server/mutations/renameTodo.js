
export async function renameTodo({ id, text }) {
  const { Todo } = this.model;

  const todo = await Todo.node(id).update({ text });
  return { todo };
}
