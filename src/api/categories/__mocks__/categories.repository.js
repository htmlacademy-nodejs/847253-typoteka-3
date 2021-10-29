class CategoriesRepositoryMock {}

CategoriesRepositoryMock.prototype.readCategories = jest.fn();

module.exports = CategoriesRepositoryMock;
