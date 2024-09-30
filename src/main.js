import axios from 'axios';
import { renderImageCards, clearGallery, showLoader, hideLoader } from './js/pixabay-api';
import Notiflix from 'notiflix'; 

document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = '46234405-5fabb3e7cd0fd4a5073c0abd3';
  const BASE_URL = 'https://pixabay.com/api/';
  const PER_PAGE = 15;

  let query = '';
  let page = 1;
  let totalHits = 0;

  const searchForm = document.getElementById('search-form');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const gallery = document.querySelector('.gallery');

  async function fetchImages(query, page) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGE}`;
    
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      Notiflix.Notify.failure('Oops, something went wrong. Try again later.');
      throw new Error(error);
    }
  }

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearGallery();
    query = event.target.query.value.trim();
    page = 1; 
    loadMoreBtn.style.display = 'none';
    showLoader();

    try {
      const data = await fetchImages(query, page);
      totalHits = data.totalHits;
      
      if (totalHits === 0) {
        Notiflix.Notify.failure('No images found. Try another query.');
        return;
      }

      renderImageCards(data.hits);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      
      if (totalHits > PER_PAGE) {
        loadMoreBtn.style.display = 'block';
      }
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  });

  loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    showLoader();

    try {
      const data = await fetchImages(query, page);
      renderImageCards(data.hits);

      if (page * PER_PAGE >= totalHits) {
        loadMoreBtn.style.display = 'none';
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      }

      scrollToNewImages();
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  });

  function scrollToNewImages() {
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
});

