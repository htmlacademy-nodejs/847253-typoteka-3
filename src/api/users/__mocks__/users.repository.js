class UsersRepositoryUserNotFoundErrorMock extends Error {}

class UsersRepositoryMock {}

UsersRepositoryMock.prototype.readUsers = jest.fn();
UsersRepositoryMock.prototype.readUser = jest.fn();

module.exports = {
  UsersRepository: UsersRepositoryMock,
  UsersRepositoryUserNotFoundError: UsersRepositoryUserNotFoundErrorMock,
};
