console.log("Hello Odin Library");
const shelve = document.querySelector(".shelve");

// author, title, pages, read, coverColor

//to achiever coverColor, I would have to use colorPickers

const myLibrary = [];

function Book(author, title, pages, read, color="brown") {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.color = color;
}

Book.prototype.display = function () {
    return `${this.title} by ${this.author}`;
}

function addBookToLibrary(author, title, pages, read, color="brown") {
    console.log(arguments)
    const newBook = new Book(...arguments);
    myLibrary.push(newBook);
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

    author.textContent = book.author;

    shelveSpace.classList.add("shelve-space")
    shelveSpace.style.backgroundColor = book.color,
    
    cover.classList.add("cover")
    cover.append(title, image, author);

    shelveSpace.appendChild(cover);

    caption.classList.add("caption")
    captionTitle.textContent = book.title;
    caption.textContent = book.author;
    caption.appendChild(captionTitle);

    spot.append(shelveSpace, caption);
    
    return spot;
}


function displayLibrary() {
    shelve
    for (const book of myLibrary) {
        const spot = createBookDisplay(book);
        shelve.appendChild(spot);
    }
}


addBookToLibrary("Simpa", "up and doing", 17, true);
displayLibrary();

// console.log(myLibrary)
// console.log(myLibrary[0].display());