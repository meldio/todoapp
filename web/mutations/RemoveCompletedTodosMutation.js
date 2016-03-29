/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import Relay from 'react-relay';

export default class RemoveCompletedTodosMutation extends Relay.Mutation {
  static fragments = {
    // TODO: Make completedCount, edges, and totalCount optional
    todos: () => Relay.QL`
      fragment on TodoConnection {
        edges {
          node {
            complete,
            id,
          },
        },
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        todoCounts: todos {
          completed: count(filter: COMPLETED)
          total: count
        }
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{removeCompletedTodos}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on RemoveCompletedTodosPayload {
        deletedTodoIds,
        viewer {
          todoCounts: todos {
            completed: count(filter: COMPLETED)
            total: count
          }
        },
      }
    `;
  }
  getConfigs() {
    return [ {
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'todos',
      deletedIDFieldName: 'deletedTodoIds',
    } ];
  }
  getVariables() {
    return {};
  }
  getOptimisticResponse() {
    let deletedTodoIds;
    let newTotalCount;
    if (this.props.todos && this.props.todos.edges) {
      deletedTodoIds = this.props.todos.edges
        .filter(edge => edge.node.complete)
        .map(edge => edge.node.id);
    }
    const { completed, total } = this.props.viewer.todoCounts || {
      completed: null,
      total: null,
    };
    if (completed !== null && total !== null) {
      newTotalCount = total - completed;
    }
    return {
      deletedTodoIds,
      viewer: {
        id: this.props.viewer.id,
        todoCounts: {
          completed: 0,
          total: newTotalCount,
        }
      },
    };
  }
}
