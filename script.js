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
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault(); //tranh khi bam vao no thay doi tren url
  if (e.target.classList.contains('nav__link')) { //kiem tra nhan chinh xac vao nut moi thuc hien
      const sectionSelector = e.target.getAttribute('href');
      //do href cua tung nut va id cua section duoc lien ket voi nhau
      document.querySelector(sectionSelector).scrollIntoView({behavior : 'smooth'});
  }
})

//tabed
const tabBtns = document.querySelectorAll('.operations__tab') || 1;
console.log(tabBtns);
tabBtns.forEach(function (el) {
  //dung bubbling thi performance cao hon nhung xu ly phuc tap hon
    el.addEventListener('click', function() {
      //active button
      document.querySelector('.operations__tab--active').classList.remove('operations__tab--active');
      el.classList.add('operations__tab--active');

      //active content 
      document.querySelector('.operations__content--active').classList.remove('operations__content--active');
      const contentSelected = '.operations__content--' + el.getAttribute('data-tab');
      console.log(contentSelected);
      document.querySelector(contentSelected).classList.add('operations__content--active');
    })
})


//xu ly mouse event tren nav
const nav = document.querySelector('.nav');
  //dung bubbling
const mouseHandler = function(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const siblings = nav.querySelectorAll('.nav__link');
    siblings.forEach(function(el) {
      if (el != e.target) el.style.opacity = opacity; 
    })
  }
  document.querySelector('.nav__logo').style.opacity = opacity;
}

nav.addEventListener('mouseover', function(e) {
  mouseHandler(e, 0.5);
})

nav.addEventListener('mouseout', function(e) {
  mouseHandler(e, 1);
})

//khi cuon toi section 1, navbar se thanh sticky
const section1Top = document.querySelector('#section--1').getBoundingClientRect().top;
window.addEventListener('scroll', function() {
  if (this.window.scrollY > section1Top)
      nav.classList.add('sticky');
  else
      nav.classList.remove('sticky');
})

//sliders 
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft =  document.querySelector('.slider__btn--left');
const btnRight =  document.querySelector('.slider__btn--right');

const maxSlide = slides.length - 1;
let currentSlide = 0;
const updateSlider = function(currentSlide) {
    slides.forEach(function(el, i) {
      el.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
      console.log(el.style.transform);
    })
}

      //dots
      const dotContainer = document.querySelector('.dots');
      const createDots = function() {
          slides.forEach(function(_, i) {
            dotContainer.insertAdjacentHTML(
              'beforeend',
              `<button class="dots__dot" data-slide="${i}"></button>`
            )
          })
      }
      createDots();
      const dots = document.querySelectorAll('.dots__dot');
      const updateDot = function (currentSlide) {
        if (document.querySelector('.dots__dot--active'))
          document.querySelector('.dots__dot--active').classList.remove('dots__dot--active')
          dots.forEach(function(el) {
            if (el.getAttribute('data-slide') == currentSlide)
                el.classList.add('dots__dot--active');
          })
      }
updateSlider(0);
updateDot(0);
const turnPreviousSlide = function() {
  currentSlide--;
  if (currentSlide < 0)
      currentSlide = maxSlide;
  updateSlider(currentSlide);
  updateDot(currentSlide);
}

const turnNextSlide = function() {
  currentSlide++;
  if (currentSlide > maxSlide)
      currentSlide = 0;
  updateDot(currentSlide);
  updateSlider(currentSlide);
}

btnLeft.addEventListener('click', turnPreviousSlide);

btnRight.addEventListener('click', turnNextSlide);

slider.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft')
      turnPreviousSlide();
  if (e.key === 'ArrowRight')
      turnNextSlide();
})
