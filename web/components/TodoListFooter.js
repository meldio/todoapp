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

import {IndexLink, Link} from 'react-router';
import RemoveCompletedTodosMutation
  from '../mutations/RemoveCompletedTodosMutation';

import React from 'react';
import Relay from 'react-relay';

class TodoListFooter extends React.Component {
  _handleRemoveCompletedTodosClick = () => {
    Relay.Store.commitUpdate(
      new RemoveCompletedTodosMutation({
        todos: this.props.viewer.todos,
        viewer: this.props.viewer,
      })
    );
  }
  render() {
    const todoCounts = this.props.viewer.todoCounts || { };
    const numCompletedTodos = todoCounts.completed || 0;
    const numTotalTodos = todoCounts.total || 0;
    const numRemainingTodos = numTotalTodos - numCompletedTodos;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{numRemainingTodos}</strong> item
          {numRemainingTodos === 1 ? '' : 's'} left
        </span>
        <ul className="filters">
          <li>
            <IndexLink to="/" activeClassName="selected">All</IndexLink>
          </li>
          <li>
            <Link to="/active" activeClassName="selected">Active</Link>
          </li>
          <li>
            <Link to="/completed" activeClassName="selected">Completed</Link>
          </li>
        </ul>
        {numCompletedTodos > 0 &&
          <button
            className="clear-completed"
            onClick={this._handleRemoveCompletedTodosClick}>
            Clear completed
          </button>
        }
      </footer>
    );
  }
}

export default Relay.createContainer(TodoListFooter, {
  prepareVariables() {
    return {
      limit: 2147483647,
    };
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        todoCounts: todos {
          completed: count(filter: COMPLETED)
          total: count
        }
        todos(filter: COMPLETED, first: $limit) {
          ${RemoveCompletedTodosMutation.getFragment('todos')},
        },
        ${RemoveCompletedTodosMutation.getFragment('viewer')},
      }
    `,
  },
});
