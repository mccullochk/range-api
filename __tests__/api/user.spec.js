// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Pushan Mitra on 2019-03-07.
//
import assert from 'assert';
import { default as request } from 'supertest'; // eslint-disable-line
import app from '../../src';
import testHelper, { Config } from '../../__testHelpers__/test.helper';
import { connection } from '../../src/libs/db2';

describe('Test user routes', () => {
  afterAll(() => {
    connection.destroy();
  });

  test('The readiness probe should respond with 200 ', async (done) => {
    await request(app).get(testHelper.routes.users)
      .set('Authorization', `Bearer ${Config.token}`)
      .set('accept', '*/*')
      .set('Connection', 'keep-alive')
      .set('host', 'localhost:8080')
      .set('cache-control', 'no-cache')
      .expect(200)
      .then(resp => {
        const { body } = resp;
        // console.dir(body);
        assert.equal(body.length > 0, true);
        done();
      });
  });
});