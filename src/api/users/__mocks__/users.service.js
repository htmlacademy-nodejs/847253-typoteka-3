class UsersServiceMock {}

UsersServiceMock.prototype.readUsers = jest.fn();
UsersServiceMock.prototype.readUser = jest.fn();

module.exports = UsersServiceMock;
