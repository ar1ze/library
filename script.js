const addBookBtn = document.querySelector('.add-book-btn');
const addBookDialog = document.querySelector('.add-book-dialog');
const dialogCloseBtn = document.querySelector('.add-book-dialog__close-btn');
const dialogSubmitBtn = document.querySelector('.add-book-form__submit-btn');

addBookBtn.addEventListener('click', () => {
  addBookDialog.showModal();
});

dialogCloseBtn.addEventListener('click', () => {
  addBookDialog.close();
});
