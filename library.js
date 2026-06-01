console.log("Hello Odin Library");
const shelve = document.querySelector(".shelve");
const bookForm = document.querySelector("#book-form");
const addBookDialog = document.querySelector("#add-book");
const book = document.querySelectorAll("book.cover");
const bookDialog = document.querySelector("#book-dialog")

const myLibrary = [];


function Book(author, title, pages, summary, read=false, color="brown") {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.summary = summary
    this.color = color;
}

Book.prototype.display = function () {
    return `${this.title} by ${this.author}`;
}

function addBookToLibrary(author, title, pages, summary, read=false, color="brown") {
    const newBook = new Book(...arguments);
    myLibrary.push(newBook);

    return newBook;
}


function createBookDisplay(book) {
    const spot = document.createElement("li");
    const cover = document.createElement("button");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const image = document.createElement("img");
    const shelveSpace = document.createElement("div");
    const caption = document.createElement("p");
    const captionTitle = document.createElement("span");
    
    //image in every book cover
    image.src = "./image/book.svg";
    image.style.width = "24px";

    title.classList.add("title");
    title.textContent = book.title;
    title.style.color = book.color;

    author.textContent = book.author;

    shelveSpace.classList.add("shelve-space")
    shelveSpace.style.backgroundColor = book.color,
    
    cover.classList.add("cover")
    cover.dataset.id = book.id;
    cover.command = "show-modal";
    cover.commandForElement = bookDialog;

    cover.append(title, image, author);

    shelveSpace.appendChild(cover);

    caption.classList.add("caption");
    captionTitle.classList.add("caption-title");
    captionTitle.textContent = book.title;
    caption.textContent = book.author;
    caption.appendChild(captionTitle);

    spot.classList.add("filled-spot", "spot");
    spot.append(shelveSpace, caption);
    
    return spot;
}


function shelveBooks(...library) {
    for (const book of library) {
        const spot = createBookDisplay(book);
        shelve.appendChild(spot);
    }
}


function findBook(id) {
    return myLibrary.reduce(
        (desiredBook, currentBook) => {
            if(desiredBook.id != id) {
                desiredBook = currentBook;
            }
            return desiredBook;
        }
    );
}

function displayBook(id) {
    const book = findBook(id);
}


function removeBook(id) {
    
}


bookForm.addEventListener("submit",
    (event) => {
        event.preventDefault();
        
        //collect form entry
        const bookEntry = new FormData(bookForm);
        const bookData = Object.fromEntries(bookEntry.entries());
        
        //clean the Data
        bookData.pages = Number(bookData.pages)
        bookData.read = bookData.read == "true" ? true : false;
        
        //add book to Library & Display book
        const book = addBookToLibrary(
            bookData.author,
            bookData.title,
            bookData.pages,
            bookData.summary,
            bookData.read,
            bookData.color,
        )

        shelveBooks
    (book);

        bookForm.reset();

        addBookDialog.close();
})



addBookToLibrary(
    "Simpa", 
    "up and doing", 
    17, 
    "A very pleasant book about the  highs and lows of life"
);

shelveBooks(...myLibrary);




// console.log(myLibrary)
// console.log(myLibrary[0].display());