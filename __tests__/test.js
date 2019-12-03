const server = require('../src/server.js').server;
const supertester = require('./supertester.js');

const mockRequest = supertester.server(server);


describe('Routes testing', () => {
  it('Homepage is accessible', () => {
    mockRequest.get('/')
      .then( (res) => expect(res.status).toBe(200));
  });
});