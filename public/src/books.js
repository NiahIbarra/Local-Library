//helper function
function BookBorrowedCheck(book){
  return book.borrows.every((borrowsObj) => borrowsObj.returned === true);
}

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}
// return the obj that matches the id
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let arrayFalse = [];
  let arrayTrue = [];
  books.forEach((book) => {
    BookBorrowedCheck(book) === true ? arrayTrue.push(book) : arrayFalse.push(book);
  });
  return [arrayFalse, arrayTrue];
}
// return an array of 2 arrays first, books where returned is false, second where returned is true

function getBorrowersForBook({ borrows }, accounts) {
  const accountsCheckedOut = accounts.filter((account) => {
    const accountCheck = borrows.some((borrow) => borrow.id === account.id);
    if(accountCheck){ return account };
  });
  return accountsCheckedOut.map((account) => {
    const borrowForAccount = borrows.find((borrow) => borrow.id === account.id);
    account.returned = borrowForAccount.returned;
    return account;
  }).splice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
