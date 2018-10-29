/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  return books.find(book => bookId === book.id)
}

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  return authors.find(author => author.name.toLowerCase() === authorName.toLowerCase());
}

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  return authors.map(author => ({
    author:author.name,
    bookCount:author.books.length
  }))
}

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};
  // Your code goes here
  // for(let i=0;i<books.length;i++){
  //   if(books[i].color in colors){
  //     colors[books[i].color].push(books[i].title);
  //   }else{
  //     colors[books[i].color]=[books[i].title];
  //   }
  // }
  books.forEach(book => {
    if(book.color in colors){
        colors[book.color].push(book.title);
      }else{
        colors[book.color]=[book.title];
      }
  })
  return colors;
}

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  let titles=[];
  let author=getAuthorByName(authorName, authors);
  if(author !== undefined){
    for(let j=0;j<author.books.length;j++){
      let book = getBookById(author.books[j], books);
      titles.push(book.title);
    }
  }
  return titles;
}

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  let auth;
  let counter=0;
  for(let i=0;i<authors.length;i++){
    if(authors[i].books.length>counter){
      counter=authors[i].books.length;
      auth=authors[i].name;
    }
  }
  return auth;
  // Your code goes here
}

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  // Your code goes here
  let author=[];
  let titles=[];
  for(let i=0;i<authors.length;i++){
    if(authors[i].books.includes(bookId)){
      author.push(authors[i]);
    }
  }
  for(let j=0;j<author.length;j++){
    let temp = titlesByAuthorName(author[j].name, author, books);
    for(let z=0;z<temp.length;z++){
      if(!titles.includes(temp[z])){
        titles.push(temp[z]);
      }
    }
  }
  return titles;
}

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // Your code goes here
  let auth1;
  let no=0;
  for(let i=0;i<authors.length;i++){
    let temp=authors[i].books;
    let booksshared=0;
    for(let z=0;z<authors.length;z++){
      for(let j=0;j<temp.length;j++){
        if(authors[z].books.includes(temp[j])){
          booksshared++;
        }
      }
    }
    if(booksshared>no){
      auth1=authors[i];
      no=booksshared;
    }
  }
  return auth1.name;
}

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */

// const authors = require("./authors.json");
// const books = require("./books.json");

// console.log(getBookById(12, books));
// console.log(getAuthorByName("J.K. Rowling", authors));
// console.log(bookCountsByAuthor(authors));
// console.log(booksByColor(books));
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));
// console.log(mostProlificAuthor(authors));
// console.log(relatedBooks(50, authors, books));
// console.log(friendliestAuthor(authors));
