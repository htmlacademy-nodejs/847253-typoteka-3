class SearchServiceMock {}

SearchServiceMock.prototype.search = jest.fn();

module.exports = SearchServiceMock;
