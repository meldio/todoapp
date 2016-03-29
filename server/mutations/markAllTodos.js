
export async function markAllTodos({ complete }) {
  const { Todo } = this.model;

  const viewer = this.viewer;
  const viewerTodoIds = await viewer.todos.nodeIds();

  const changedTodos = await Todo
    .filter({
      id: { eq: viewerTodoIds },
      complete: { eq: !complete } })
    .update({ complete });

  return { changedTodos, viewer };
}
