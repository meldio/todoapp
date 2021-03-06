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

import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const APP_PORT = 3000;
const GRAPHQL_URL = 'http://localhost:9000';

// Serve the Relay app
const compiler = webpack({
  entry: path.resolve(__dirname, '../web', 'app.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {stage: 0, plugins: [ '../plugins/babelRelayPlugin' ]},
        test: /\.js$/,
      },
    ],
  },
  output: { filename: 'app.js', path: '/' },
});
const app = new WebpackDevServer(compiler, {
  contentBase: '../public/',
  proxy: {
    '/graphql': `${GRAPHQL_URL}/graphql`,
    '/auth': `${GRAPHQL_URL}/auth`,
  },
  publicPath: '/web/',
  stats: { colors: true },
});
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, '..', 'public')));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
