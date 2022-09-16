function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((total, book) => {
    book.borrows[0].returned === false ? total++ : null;
    return total;
  }, 0);
}

function getMostCommonGenres(books) {
  let result = [];
  books.forEach((book) => {
    if(result.length === 0){
      result.push({name: book.genre, count: 1});
    } else {
      let genreCheck = result.some((genre) => genre.name === book.genre);
      if(genreCheck){
        let genreIndex = result.findIndex(genre => genre.name === book.genre);
        result[genreIndex].count++;
      } else {
        result.push({name: book.genre, count: 1});
      }
    }
  });
  return result.sort((genreA, genreB) => genreA.count < genreB.count ? 1 : -1).splice(0, 5);
}

function getMostPopularBooks(books) {
  const unsortedBooks = books.reduce((result, book) => {
    result.push({name: book.title, count: book.borrows.length});
    return result;
  }, []);
  return unsortedBooks.sort((bookA, bookB) => bookA.count < bookB.count ? 1 : -1).splice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let result = [];
  authors.forEach((author) => {
    books.forEach((book) => {
      if(result.length === 0){
        if(book.authorId === author.id){
          result.push({name: `${author.name.first} ${author.name.last}`, count: book.borrows.length});
        }
      } else {
        if(book.authorId === author.id){
          const authorCheck = result.some((newAuthor) => `${newAuthor.name}` === `${author.name.first} ${author.name.last}`);
          if(!authorCheck){
            result.push({name: `${author.name.first} ${author.name.last}`, count: book.borrows.length});
          } else {
            const authorIndex = result.findIndex((newAuthor) => `${newAuthor.name}` === `${author.name.first} ${author.name.last}`);
            result[authorIndex].count += book.borrows.length;
          }
        }
      }
    });
  });
  return result.sort((authorA, authorB) => authorA.count < authorB.count ? 1 : -1).splice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
