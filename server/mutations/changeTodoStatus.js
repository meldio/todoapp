
export async function changeTodoStatus({ id, complete }) {
  const { Todo } = this.model;

  const todo = await Todo.node(id).update({ complete });
  const viewer = this.viewer;

  return { todo, viewer };
}
