export const sortBooks = (list) => {
  // Sort the list of books
  const newList = list.sort(function (a, b) {
    const firstTitle = a
      .title
      .toUpperCase();
    const secondTitle = b
      .title
      .toUpperCase();
    if (firstTitle < secondTitle) {
      return -1;
    }
    if (firstTitle > secondTitle) {
      return 1;
    }
    return 0;
  })

  return newList;
}

export const mergeShelfAndSearch = (shelf, search) => {
  const hashTable = {};
  shelf.forEach(book => hashTable[book.id] = book.shelf);

  search.forEach(book => {
      book.shelf = hashTable[book.id] || 'none';
  });

  return search;
}