const assert = require('assert');
const { getCharacters, dialogflowFirebaseFulfillment } = require('../index');

// describe('getCharacters()', () => {
//   it('is a fonction', () => {
//     assert.strictEqual(typeof getCharacters, 'function');
//   });
//   it('return 933', (done) => {
//     assert.strictEqual(getCharacters(), '933');
//     done()
//   });
// });



// describe('getMovies()', () => {
//   it('is a fonction', () => {
//     assert.strictEqual(typeof getMovies, 'function');
//   });
// });

describe('dialogflowFirebaseFulfillment', () => {
  it('is a fonction', () => {
    assert.strictEqual(typeof dialogflowFirebaseFulfillment, 'function');
  });
});
