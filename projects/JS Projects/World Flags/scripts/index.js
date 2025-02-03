import { countries, reset, search } from "./countriesService.js";
import { createCards } from "./domService.js";

const cardsContainer = document.getElementById('cards');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Function to handle search
const handleSearch = () => {
    const query = searchInput.value.trim();
    reset();
    cardsContainer.innerHTML = '';

    if (!query) {
        createCards();
    } else {
        search(query);
        createCards();
    }
};

// Search on input change
searchInput.addEventListener('input', handleSearch);

// Search on button click
searchButton.addEventListener('click', handleSearch);

// Initialize cards on page load
createCards();
