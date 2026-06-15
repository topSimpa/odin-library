console.log("Hello Odin Library");
const shelve = document.querySelector(".shelve");
const bookForm = document.querySelector("#book-form");
const addBookDialog = document.querySelector("#add-book");
const books = document.querySelectorAll("button.cover");
const bookDialog = document.querySelector("#book-dialog");


const displayUI = {
    title: bookDialog.querySelector("#book-title"),
    author: bookDialog.querySelector("#book-author"),
    caption: bookDialog.querySelector("#caption-display"),
    easel: bookDialog.querySelector("#easel"),
    pages: bookDialog.querySelector("#total-pages"),
    read: bookDialog.querySelector("#read-status"),
    summary: bookDialog.querySelector("#summary-box"),
    deleteButton: bookDialog.querySelector("#delete"),
}

const myLibrary = [];

class Book {
    #id;
    #read;

    constructor(author, title, pages, summary, read=false, color="brown") {
        //private because they should be only readable, or 
        // intentionally changed
        this.#id = crypto.randomUUID();  
        this.#read = read;

        this.author = author;
        this.title = title;
        this.pages = pages,
        this.summary = summary;
        this.color = color;
    }

    get id() {
        return this.#id;
    }

    get read() {
        return this.#read;
    }

    toggleRead() {
        this.#read = !this.#read;
    }

}

function addBookToLibrary(author, title, pages, summary, read=false, color="brown") {
    const newBook = new Book(...arguments);
    myLibrary.push(newBook);

    return newBook;
}

function deleteBook(id) {
    console.log(id);
    const index = myLibrary.findIndex(book => book.id === id);
    const spot = document.querySelector(`li[data-id="${id}"`)

    if (index !== -1) {
        myLibrary.splice(index, 1);
    }

    spot.remove();
    bookDialog.close();
}

function displayBook(book) {
    const captionTitle = document.createElement("span");

    captionTitle.classList.add("caption-title")
    captionTitle.textContent = book.title;

    displayUI.title.textContent = book.title;
    displayUI.title.style.color = book.color;
    displayUI.author.textContent = book.author;
    displayUI.caption.textContent = book.author
    displayUI.caption.append(captionTitle);
    displayUI.easel.style.backgroundColor = book.color;
    displayUI.pages.textContent = `${book.pages} pages`;
    displayUI.summary.textContent = book.summary;

    displayUI.read.addEventListener("change", 
        (e) => {
            console.log(e.target.checked)
            book.toggleRead();
        }
    )
    if (book.read) {
        displayUI.read.checked = true;
    }

    console.log(book.id);
    displayUI.deleteButton.dataset.id = book.id;
    displayUI.deleteButton.addEventListener("click", 
        () => deleteBook(book.id)
    );

    bookDialog.showModal();
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

    //add DisplayBook EventListener
    cover.addEventListener("click",
        () => displayBook(book)
    );

    cover.append(title, image, author);

    shelveSpace.appendChild(cover);

    caption.classList.add("caption");
    captionTitle.classList.add("caption-title");
    captionTitle.textContent = book.title;
    caption.textContent = book.author;
    caption.appendChild(captionTitle);

    spot.classList.add("filled-spot", "spot");
    spot.dataset.id = book.id;
    spot.append(shelveSpace, caption);
    
    return spot;
}


function shelveBooks(...library) {
    for (const book of library) {
        const spot = createBookDisplay(book);
        shelve.appendChild(spot);
    }
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
    "A very pleasant book about the  highs and lows of life",
    true,
);

addBookToLibrary(
  "James Clear",
  "Atomic Habits",
  320,
  "A guide to building good habits and breaking bad ones through small, consistent improvements that compound over time.",
  true,
  "#A52A2A"
);

addBookToLibrary(
  "Paulo Coelho",
  "The Alchemist",
  208,
  "A philosophical story about a shepherd's journey to discover his personal legend and follow his dreams.",
  true,
  "#DAA520"
);

addBookToLibrary(
  "David Goggins",
  "Can't Hurt Me",
  364,
  "A memoir about overcoming extreme adversity through mental toughness, discipline, and self-mastery.",
  false,
  "#000000"
);

addBookToLibrary(
  "Ryan Holiday",
  "The Obstacle Is the Way",
  224,
  "A modern interpretation of Stoic philosophy showing how obstacles can be transformed into opportunities.",
  false,
  "#708090"
);

addBookToLibrary(
  "Mark Manson",
  "The Subtle Art of Not Giving a F*ck",
  224,
  "A counterintuitive approach to living a better life by focusing only on what truly matters.",
  true,
  "#FF4500"
);


shelveBooks(...myLibrary);
