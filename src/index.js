document.addEventListener("DOMContentLoaded", function() {
    // Base URL
    const baseURL = 'http://localhost:3000';

    // Define a global variable to store the current ticket count
    let currentTicketCount = 0;

    // Fetch film details 
    function fetchFilmDetails() {
        // Fetch film details for first movie
        fetch(`${baseURL}/films/1`)
            .then(response => response.json())
            .then(film => {
                // Update poster, title, runtime, showtime, available tickets, and film description
                updateFilmDetails(film);
            })
            .catch(error => console.error('Error fetching film details:', error));

        // Fetch all films and populate the films menu
        fetch(`${baseURL}/films`)
            .then(response => response.json())
            .then(films => {
                const filmMenu = document.getElementById('films');
                films.forEach(film => {
                    const filmItem = document.createElement('li');
                    filmItem.classList.add('film', 'item');
                    filmItem.textContent = film.title;
                    filmItem.addEventListener('click', () => displayFilmDetails(film.id));
                    filmMenu.appendChild(filmItem);
                });
            })
            .catch(error => console.error('Film error:', error));
    }

    // Update film details on the page
    function updateFilmDetails(film) {
        // Update poster
        const poster = document.getElementById('poster');
        poster.src = film.poster;
        poster.alt = film.title;

        // Update title
        const title = document.getElementById('title');
        title.textContent = film.title;

        // Update runtime
        const runtime = document.getElementById('runtime');
        runtime.textContent = `${film.runtime} minutes`;

        // Update showtime
        const showtime = document.getElementById('showtime');
        showtime.textContent = film.showtime;

        // Calculate available tickets
        const availableTickets = film.capacity - film.tickets_sold;
        currentTicketCount = availableTickets; // Update the current ticket count
        const ticketNum = document.getElementById('ticket-num');
        ticketNum.textContent = currentTicketCount;

        // Update film info
        const filmInfo = document.getElementById('film-info');
        filmInfo.textContent = film.description;

        // Add event listener to "Buy Ticket" button
        const buyTicketButton = document.getElementById('buy-ticket');
        buyTicketButton.addEventListener('click', () => buyTicket(film));
    }

    // Buying a ticket
    function buyTicket(film) {
        if (currentTicketCount > 0) {
            // Update tickets sold count
            film.tickets_sold++;
            // Update number of available tickets
            currentTicketCount--;
            const ticketNum = document.getElementById('ticket-num');
            ticketNum.textContent = currentTicketCount;
        } else {
            // Alert the user that tickets are sold out
            alert('SOLD OUT!! Try next time.');
        }
    }

    // Display film details when clicked
    function displayFilmDetails(filmId) {
        // Fetch film details based on Id and update the DOM
        fetch(`${baseURL}/films/${filmId}`)
            .then(response => response.json())
            .then(film => {
                // Update film details
                updateFilmDetails(film);
            })
            .catch(error => console.error('Film error:', error));
    }

    // Invoke fetchFilmDetails
    fetchFilmDetails();
});
