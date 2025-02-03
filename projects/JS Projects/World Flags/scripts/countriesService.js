const getCountries = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        return await res.json();
    } catch (error) {
        console.error('Failed to fetch countries', error);
    }
};

const countriesFull = await getCountries();
let countries = [...countriesFull];

// Function to reset the countries array
const reset = () => {
    countries = [...countriesFull];
};

// Function to filter countries based on search word
const search = (word) => {
    countries = countriesFull.filter((country) => {
        const name = country.name.common.toLowerCase();
        const formattedWord = word.toLowerCase();
        return name.includes(formattedWord);
    });
};

export { countries, reset, search };
