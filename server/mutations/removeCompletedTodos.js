
export async function removeCompletedTodos() {
  const { Todo } = this.model;

  const viewer = this.viewer;
  const viewerTodoIds = await viewer.todos.nodeIds();

  const deletedTodoIds =
    await Todo
      .filter({
        id: { eq: viewerTodoIds },  // TODO: Add support for in: <NodeConn>
        complete: { eq: true } })   //  construct, i.e. id: { in: viewer.todos }
      .delete();

  return { deletedTodoIds, viewer };
}
