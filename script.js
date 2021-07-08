//modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//scroll when click read more
const btnScrollTo = document.querySelector('.btn--scroll-to');
btnScrollTo.addEventListener('click', function() {
  const section1 = document.querySelector('#section--1');
  section1.scrollIntoView({behavior : 'smooth'});
})

//dung bubbling de lam dieu huong cho hang nut navbar
//1. chon khoi chua chung nhat cua hang nut
//2. xac dinh nut duoc bam
document.querySelector('nav__links').addEventListener('click', function(e) {
  e.preventDefault(); //tranh khi bam vao no thay doi tren url
  if (e.target.classList.contains('nav__link')) { //kiem tra nhan chinhnxac vao nut moi thuc hien
      const sectionSelector = e.target.href;
      //do href cua tung nut va id cua section duoc lien ket voi nhau
      document.querySelector(sectionSelector);
  }
})

