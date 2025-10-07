const myLibrary = [];

const bookGrid = document.querySelector('.book-grid');
const addBookBtn = document.querySelector('.add-book-btn');

const dialog = document.querySelector('.add-book-dialog');
const dialogCloseBtn = document.querySelector('.add-book-dialog__close-btn');
const dialogForm = document.querySelector('.add-book-dialog__form');

const ICONS = {
  read: `<svg class="book-card__icon-read" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>book-open-variant-outline</title>
    <path d="M12 21.5C10.65 20.65 8.2 20 6.5 20C4.85 20 3.15 20.3 1.75 21.05C1.65 21.1 1.6 21.1 1.5 21.1C1.25 21.1 1 20.85 1 20.6V6C1.6 5.55 2.25 5.25 3 5C4.11 4.65 5.33 4.5 6.5 4.5C8.45 4.5 10.55 4.9 12 6C13.45 4.9 15.55 4.5 17.5 4.5C18.67 4.5 19.89 4.65 21 5C21.75 5.25 22.4 5.55 23 6V20.6C23 20.85 22.75 21.1 22.5 21.1C22.4 21.1 22.35 21.1 22.25 21.05C20.85 20.3 19.15 20 17.5 20C15.8 20 13.35 20.65 12 21.5M11 7.5C9.64 6.9 7.84 6.5 6.5 6.5C5.3 6.5 4.1 6.65 3 7V18.5C4.1 18.15 5.3 18 6.5 18C7.84 18 9.64 18.4 11 19V7.5M13 19C14.36 18.4 16.16 18 17.5 18C18.7 18 19.9 18.15 21 18.5V7C19.9 6.65 18.7 6.5 17.5 6.5C16.16 6.5 14.36 6.9 13 7.5V19M14 16.35C14.96 16 16.12 15.83 17.5 15.83C18.54 15.83 19.38 15.91 20 16.07V14.57C19.13 14.41 18.29 14.33 17.5 14.33C16.16 14.33 15 14.5 14 14.76V16.35M14 13.69C14.96 13.34 16.12 13.16 17.5 13.16C18.54 13.16 19.38 13.24 20 13.4V11.9C19.13 11.74 18.29 11.67 17.5 11.67C16.22 11.67 15.05 11.82 14 12.12V13.69M14 11C14.96 10.67 16.12 10.5 17.5 10.5C18.41 10.5 19.26 10.59 20 10.78V9.23C19.13 9.08 18.29 9 17.5 9C16.18 9 15 9.15 14 9.46V11Z" />
  </svg>`,
  unread: `<svg class="book-card__icon-unread" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>book-outline</title>
    <path d="M18,2A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H18M18,4H13V12L10.5,9.75L8,12V4H6V20H18V4Z" />
  </svg>`,
  trash: `<svg class="book-card__icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>trash-can-outline</title>
    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
  </svg>`,
};

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

function createBookCard(book) {
  const card = document.createElement('article');
  card.classList.add('book-card');

  const isRead = book.isRead;
  const readStatusClass = isRead
    ? 'book-card__toggle-read btn--is-read'
    : 'book-card__toggle-unread';
  const readStatusIcon = isRead ? ICONS.read : ICONS.unread;
  const readStatusText = isRead ? 'Read' : 'Not Read';

  card.innerHTML = `
    <div class="book-card__body">
      <div class="book-card__info">
        <h2 class="book-card__title">${book.title}</h2>
        <p class="book-card__author">${book.author}</p>
        <p class="book-card__pages">📖 ${book.pages} Pages</p>
      </div>
      <div class="book-card__actions">
        <button class="btn ${readStatusClass}" type="button">
          <span class="book-card__icon">
            ${readStatusIcon}
          </span>
          <span class="book-card__toggle-text">${readStatusText}</span>
        </button>
        <button class="book-card__remove btn" type="button" aria-label="Remove ${book.title}">
          <span class="book-card__icon">
            ${ICONS.trash}
          </span>
          <span class="book-card__remove-text">Remove</span>
        </button>
      </div>
    </div>
  `;

  return card;
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

  const bookCard = createBookCard(newBook);
  bookGrid.insertBefore(bookCard, addBookBtn);
}

addBookBtn.addEventListener('click', showDialog);

dialogCloseBtn.addEventListener('click', closeDialog);
dialogForm.addEventListener('submit', dialogSubmit);
