function findAccountById(accounts, id) {
  return accounts.find((account) => id === account.id);
}
//return the account that matches the given id

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last.localeCompare(accountB.name.last));
}
//return an alphebetically sorted accounts array

function getTotalNumberOfBorrows({ id }, books) {
  let result = 0;
  books.forEach((book) => {
    const borrowsArray = book.borrows;
    borrowsArray.forEach((borrowed) => id === borrowed.id ? result++ : null);
  });
  return result;
}
//return a number that represents the number of times the accounts id is in any borrows array

function getBooksPossessedByAccount({ id }, books, authors) {
  const filteredBooks = books.filter((book) => {
    const idCheck = book.borrows.some((borrow) => borrow.id === id && borrow.returned === false);
    if(idCheck){ return book };
  });
  return filteredBooks.map((book) => {
    const foundAuthor = authors.find((author) => book.authorId === author.id);
    book.author = foundAuthor;
    return book;
  });
}
//return an array of book objects with the author object inside of it where the accountId is in the borrows array

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};