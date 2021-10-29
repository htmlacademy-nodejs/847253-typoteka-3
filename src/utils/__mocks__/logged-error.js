class LoggedErrorMock extends Error {}

LoggedErrorMock.prototype.log = jest.fn();

module.exports = LoggedErrorMock;
