import { countries } from "./countriesService.js";

const cardsContainer = document.getElementById('cards');

// Helper function to save liked countries to localStorage
const saveLikedCountries = (likedCountries) => {
    localStorage.setItem('likedCountries', JSON.stringify(likedCountries));
};

// Helper function to load liked countries from localStorage
const getLikedCountries = () => {
    return JSON.parse(localStorage.getItem('likedCountries')) || [];
};

const generateCard = (country) => {
    const likedCountries = getLikedCountries();

    // Create a card
    const card = document.createElement('div');
    card.className = "card m-2 col-sm-12 col-md-3";

    // Create an image
    const cardImg = document.createElement('img');
    cardImg.src = country.flags.png;
    cardImg.className = "card-img-top img mt-2 border rounded shadow";

    // Create a card body
    const cardBody = document.createElement('div');
    cardBody.className = "card-body";

    // Create a card title
    const cardTitle = document.createElement('h5');
    cardTitle.className = "card-title";
    cardTitle.innerText = country.name.common;

    // Create population text
    const population = document.createElement('p');
    population.className = "card-text";
    population.innerText = `Population: ${country.population}`;

    // Create region text
    const region = document.createElement('p');
    region.className = "card-text";
    region.innerText = `Region: ${country.region}`;

    // Create a card footer with a heart icon
    const cardFooter = document.createElement('div');
    cardFooter.className = "card-footer d-flex justify-content-center mb-2";

    const heartIcon = document.createElement('i');
    heartIcon.className = "fa fa-heart";

    // Check if the country is already liked
    if (likedCountries.includes(country.name.common)) {
        heartIcon.classList.add('text-danger');
    } else {
        heartIcon.classList.add('text-dark');
    }

    // Handle click event to toggle like state
    heartIcon.addEventListener('click', () => {
        let updatedLikedCountries = getLikedCountries();

        if (heartIcon.classList.contains('text-dark')) {
            heartIcon.classList.remove('text-dark');
            heartIcon.classList.add('text-danger');
            updatedLikedCountries.push(country.name.common);
        } else {
            heartIcon.classList.remove('text-danger');
            heartIcon.classList.add('text-dark');
            updatedLikedCountries = updatedLikedCountries.filter(name => name !== country.name.common);
        }

        // Save the updated liked countries to localStorage
        saveLikedCountries(updatedLikedCountries);
    });

    // Append elements to the card
    cardFooter.appendChild(heartIcon);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(population);
    cardBody.appendChild(region);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    // Add the card to the cards container
    cardsContainer.appendChild(card);
};

const createCards = () => {
    for (const country of countries) {
        generateCard(country);
    }
};

export { createCards };
