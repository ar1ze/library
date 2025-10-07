const myLibrary = [];

const addBookBtn = document.querySelector('.add-book-btn');

const dialog = document.querySelector('.add-book-dialog');
const dialogCloseBtn = document.querySelector('.add-book-dialog__close-btn');
const dialogForm = document.querySelector('.add-book-dialog__form');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function showDialog() {
  dialog.showModal();
}

function closeDialog() {
  dialog.close();
}

function dialogSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');
  const read = formData.has('is-read');

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  event.target.reset();
  closeDialog();
}

addBookBtn.addEventListener('click', showDialog);

dialogCloseBtn.addEventListener('click', closeDialog);
dialogForm.addEventListener('submit', dialogSubmit);
