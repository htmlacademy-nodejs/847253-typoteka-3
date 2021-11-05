const pinoMock = () => ({
  error: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
});

module.exports = pinoMock;
