import './styles.css'
import API from './apiService'
import { debounce } from 'lodash'
import resultList from '../templates/resultList.hbs'

const queryInput = document.querySelector('.search-query')
const loadMore = document.querySelector(".load-more")
const result = document.querySelector('.search-result')

const gallery = document.querySelector(".gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxOverlay = document.querySelector(".lightbox__overlay");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxCloseBtn = document.querySelector('[data-action="close-lightbox"]');

var page = 1;
var resultArray = [];
var query;

queryInput.addEventListener('input', debounce(e => {
	query = e.target.value.trim()
	resultArray = [];
	page = 1;
	API.searchImage(query, page).then(showResults)
}, 1000))

loadMore.addEventListener('click', e => {
	page += 1;
	API.searchImage(query, page).then(showResults)
	
	setTimeout(() => {
		window.scrollTo({
			top: document.body.scrollHeight,
			left: 0,
			behavior: 'smooth'
		});
	}, 1000);
});

gallery.addEventListener("click", (e) => {
	e.preventDefault();
	onModalOpen(e);
	copyGalleryAttributesToLightbox(e);
  });
  lightbox.addEventListener("click", onModalClose);


function showResults(response) {
	console.log(response.hits)
	resultArray = resultArray.concat(response.hits);
	console.log(resultArray)
	result.innerHTML = resultList(resultArray);

	if ((resultArray.length === 0) | (resultArray.length < 12 ))
	  loadMore.classList.add('hidden');
}


function onModalOpen(event) {
	if (event.target.nodeName === "IMG") {
	  lightbox.classList.add("is-open");
	}
	window.addEventListener("keydown", onModalCloseByEsc);
  }
  
function copyGalleryAttributesToLightbox(event) {
	const imageSrc = event.target.getAttribute("src");
	// const imageAlt = event.target.getAttribute("alt");
	lightboxImage.setAttribute("src", imageSrc);
	// lightboxImage.setAttribute("alt", imageAlt);
  }
  
function setLightboxAttributesByIndex(index) {
	const imageSrc = images[index].original;
	const imageAlt = images[index].description;
	lightboxImage.setAttribute("src", imageSrc);
	// lightboxImage.setAttribute("alt", imageAlt);
  }

function closeModal() {
	window.removeEventListener("keydown", onModalCloseByEsc);
	lightbox.classList.remove("is-open");
	lightboxImage.removeAttribute("src");
	lightboxImage.removeAttribute("alt");
  }
  
  
function onModalCloseByEsc(event) {
	if (event.code === "Escape") {
	  closeModal();
	}
  }


function onModalClose(event) {
	if (event.target === lightboxOverlay || event.target === lightboxCloseBtn) {
	  closeModal();
	}
  }