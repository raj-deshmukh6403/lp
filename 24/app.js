$(document).ready(function() {
    // Initialize the page
    initializeApp();
    
    // Event listener for genre filter
    $('#genre-filter').on('change', filterMovies);
    
    // Function to initialize the app
    function initializeApp() {
        populateGenreFilter();
        renderAllMovies();
    }
    
    // Function to populate the genre filter dropdown
    function populateGenreFilter() {
        // Get unique genres
        const genres = [...new Set(moviesData.map(movie => movie.genre))];
        
        // Add genres to dropdown
        $.each(genres, function(index, genre) {
            $('#genre-filter').append($('<option>').val(genre).text(genre));
        });
    }
    
    // Function to render all movies
    function renderAllMovies() {
        const $moviesContainer = $('#movies-container');
        $moviesContainer.empty();
        
        $.each(moviesData, function(index, movie) {
            $moviesContainer.append(createMovieCard(movie));
        });
    }
    
    // Function to create a movie card
    function createMovieCard(movie) {
        // Create stars based on rating
        const starsHtml = getStarsHtml(movie.rating);
        
        // Create movie card using jQuery
        const $movieCard = $('<div>').addClass('movie-card').attr('data-genre', movie.genre);
        
        // Create movie poster image
        const $poster = $('<img>')
            .addClass('movie-poster')
            .attr('src', movie.poster)
            .attr('alt', movie.title + ' poster');
        
        // Create movie info container
        const $movieInfo = $('<div>').addClass('movie-info');
        
        // Create and append movie title
        const $title = $('<h2>').addClass('movie-title').text(movie.title);
        $movieInfo.append($title);
        
        // Create and append movie genre
        const $genre = $('<span>').addClass('movie-genre').text(movie.genre);
        $movieInfo.append($genre);
        
        // Create and append summary section
        const $summaryHeading = $('<h3>').addClass('section-heading').text('Summary');
        const $summary = $('<p>').addClass('movie-summary').text(movie.summary);
        $movieInfo.append($summaryHeading, $summary);
        
        // Create and append review section
        const $reviewHeading = $('<h3>').addClass('section-heading').text('Review');
        const $review = $('<p>').addClass('movie-review').text(movie.review);
        $movieInfo.append($reviewHeading, $review);
        
        // Create and append rating
        const $rating = $('<div>').addClass('rating');
        const $stars = $('<div>').addClass('stars').html(starsHtml);
        const $ratingValue = $('<span>').addClass('rating-value').text(movie.rating + '/5');
        $rating.append($stars, $ratingValue);
        $movieInfo.append($rating);
        
        // Assemble the complete card
        $movieCard.append($poster, $movieInfo);
        
        return $movieCard;
    }
    
    // Function to generate HTML for star ratings
    function getStarsHtml(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        let starsHtml = '';
        
        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '★';
        }
        
        // Add half star if needed
        if (halfStar) {
            starsHtml += '½';
        }
        
        return starsHtml;
    }
    
    // Function to filter movies by genre
    function filterMovies() {
        const selectedGenre = $(this).val();
        
        if (selectedGenre === 'all') {
            $('.movie-card').show();
        } else {
            $('.movie-card').hide();
            $('.movie-card[data-genre="' + selectedGenre + '"]').show();
        }
    }
});