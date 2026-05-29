console.log("Hello Odin Library");

// author, title, pages, read, coverColor

//to achiever coverColor, I would have to use colorPickers

const myLibrary = [];

function Book(author, title, pages, read, coverColor="brown") {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.coverColor = coverColor;
}

Book.prototype.display = function () {
    return `${this.title} by ${this.author}`;
}

function addBookToLibrary(author, title, pages, read, coverColor="brown") {
    const newBook = new Book(author, title, pages, read, coverColor);
    myLibrary.push(newBook);
}


// addBookToLibrary("Simpa", "up and doing", 17, true);

// console.log(myLibrary)
// console.log(myLibrary[0].display());