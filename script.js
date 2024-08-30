document.addEventListener('DOMContentLoaded', () => {
    // Animate the intro section on load
    const introSection = document.getElementById('intro');
    introSection.style.opacity = 0;
    setTimeout(() => {
        introSection.style.transition = 'opacity 1.5s';
        introSection.style.opacity = 1;
    }, 200);

    // Fetch food data
    fetch('data/foods.json')
        .then(response => response.json())
        .then(data => {
            displayFoodData(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    // Initialize slider
    initializeSlider();

    // Handle dropdown menu click
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1); // Remove # from href
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
});

function displayFoodData(data) {
    const foodDetailsDiv = document.getElementById('food-details');

    data.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';

        foodItem.innerHTML = `
            <h2>${food.name}</h2>
            <p><strong>State:</strong> ${food.state}</p>
            <p>${food.description}</p>
            <h3>Recipe:</h3>
            <p>${food.recipe}</p>
        `;

        foodDetailsDiv.appendChild(foodItem);
    });
}

function initializeSlider() {
    $(document).ready(function() {
        $('.slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            autoplay: true,
            autoplaySpeed: 2000,
        });

        $('.slide').on('click', function() {
            const dish = $(this).data('dish');
            loadRecipeDetails(dish);
        });
    });
}

// Sample data for dishes (to be replaced with actual data)
const dishes = {
    andhraPradesh: {
        name: "Pulihora",
        recipe: "1. Cook rice... 2. Prepare tamarind mixture... 3. Mix together...",
        image: "images/pulihora.jpg"
    },
    punjab: {
        name: "Butter Chicken",
        recipe: "1. Marinate the chicken... 2. Prepare the gravy... 3. Cook the chicken...",
        image: "images/dish2.jpg"
    },
    kerala: {
        name: "Appam with Stew",
        recipe: "1. Make the appam batter... 2. Cook the stew... 3. Serve hot...",
        image: "images/dish3.jpg"
    }
    // Add more dishes for other states
};

// Function to load the slider items dynamically
function loadSliderItems(stateData) {
    $('.slider').slick('unslick'); // Remove previous slider
    $('.slider').empty(); // Clear slider items

    $('.slider').append(`
        <div class="slide">
            <img src="${stateData.image}" alt="${stateData.name}">
            <p>${stateData.name}</p>
        </div>
    `);

    initializeSlider();
}

// Function to show recipe details
function showRecipeDetails(stateData) {
    $('#food-details').html(`
        <h3>${stateData.name}</h3>
        <p>${stateData.recipe}</p>
        <img src="${stateData.image}" alt="${stateData.name}">
    `);
    $('#recipe-details').show();
}

// Click event handler for map regions (example usage)
$('#india-map-svg').on('click', function(event) {
    // Assuming each state has an id that matches the key in the dishes object
    const stateId = event.target.id;
    const stateData = dishes[stateId];

    if (stateData) {
        loadSliderItems(stateData);
        showRecipeDetails(stateData);
    }
});

// Function to load recipe details dynamically (e.g., from a map or other UI)
function loadRecipeDetails(dish) {
    // Simulating data fetching (replace this with actual data fetching logic)
    let recipeData = {
        dish1: {
            name: "Vada Pav",
            state: "Maharashtra",
            recipe: "1. Prepare the filling... 2. Make the batter... 3. Fry the Vada...",
            image: "images/dish1.jpg"
        },
        dish2: {
            name: "Butter Chicken",
            state: "Punjab",
            recipe: "1. Marinate the chicken... 2. Prepare the gravy... 3. Cook the chicken...",
            image: "images/dish2.jpg"
        },
        dish3: {
            name: "Appam with Stew",
            state: "Kerala",
            recipe: "1. Make the appam batter... 2. Cook the stew... 3. Serve hot...",
            image: "images/dish3.jpg"
        }
        // Add more dishes as needed
    };

    // Update recipe details in the HTML
    let selectedRecipe = recipeData[dish];
    $('#food-details').html(`
        <h3>${selectedRecipe.name} from ${selectedRecipe.state}</h3>
        <p>${selectedRecipe.recipe}</p>
        <img src="${selectedRecipe.image}" alt="${selectedRecipe.name}">
    `);

    // Show the recipe details section
    $('#recipe-details').show();
}
