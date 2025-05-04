$(document).ready(function() {
    // Club data
    const clubs = [
        {
            name: "Coding Club",
            type: "technical",
            description: "A community of passionate programmers who organize coding competitions, workshops, and collaborative projects.",
            achievements: [
                "Winner of National Hackathon 2024",
                "Organized 15+ successful coding workshops",
                "Placed 3rd in ACM ICPC Regionals"
            ],
            image: "/api/placeholder/600/400"
        },
        {
            name: "Robotics Club",
            type: "technical",
            description: "Students interested in robotics technology, automation, and AI implementations in hardware.",
            achievements: [
                "Built an autonomous delivery robot for campus",
                "First place in Techfest Robotics Challenge",
                "Published paper on swarm robotics"
            ],
            image: "/api/placeholder/600/400"
        },
        {
            name: "Dance Club",
            type: "cultural",
            description: "A vibrant group that explores various dance forms from classical to contemporary styles.",
            achievements: [
                "Won inter-college dance competition 3 years in a row",
                "Organized annual dance festival Footloose",
                "Performed at national cultural exchange program"
            ],
            image: "/api/placeholder/600/400"
        },
        {
            name: "Art Circle",
            type: "cultural",
            description: "Platform for students to explore their artistic talents through painting, sketching, and digital art.",
            achievements: [
                "Conducted art exhibition with 100+ artworks",
                "Raised ₹50,000 through charity art sale",
                "Winner of State Art Competition 2024"
            ],
            image: "/api/placeholder/600/400"
        },
        {
            name: "IEEE Student Branch",
            type: "technical",
            description: "Official IEEE student chapter that connects students with industry professionals and fellow IEEE members.",
            achievements: [
                "Hosted IEEE regional conference with 500+ attendees",
                "Published 10 research papers in IEEE journals",
                "Conducted 25+ technical workshops"
            ],
            image: "/api/placeholder/600/400"
        }
    ];

    // Function to create club card using jQuery
    function createClubCard(club) {
        const achievementsList = $('<ul>').addClass('club-achievements');
        
        // Add each achievement as a list item
        $.each(club.achievements, function(index, achievement) {
            achievementsList.append($('<li>').text(achievement));
        });
        
        // Create club card elements
        const clubCard = $('<div>').addClass('club-card').attr('data-type', club.type);
        const clubImage = $('<img>').addClass('club-image').attr('src', club.image).attr('alt', club.name);
        const clubInfo = $('<div>').addClass('club-info');
        const clubName = $('<h2>').addClass('club-name').text(club.name);
        const descTitle = $('<h3>').addClass('section-title').text('Description');
        const clubDesc = $('<p>').addClass('club-description').text(club.description);
        const achTitle = $('<h3>').addClass('section-title').text('Achievements');
        
        // Append all elements to build the card
        clubInfo.append(clubName, descTitle, clubDesc, achTitle, achievementsList);
        clubCard.append(clubImage, clubInfo);
        
        return clubCard;
    }

    // Render all clubs initially
    function renderClubs() {
        const clubsContainer = $('#clubs-container');
        clubsContainer.empty();
        
        $.each(clubs, function(index, club) {
            clubsContainer.append(createClubCard(club));
        });
    }
    
    // Filter clubs when tab buttons are clicked
    $('.tab-button').on('click', function() {
        const filterType = $(this).data('filter');
        
        // Update active button
        $('.tab-button').removeClass('active');
        $(this).addClass('active');
        
        // Filter clubs
        if (filterType === 'all') {
            $('.club-card').show();
        } else {
            $('.club-card').hide();
            $('.club-card[data-type="' + filterType + '"]').show();
        }
    });
    
    // Initialize the page
    renderClubs();
});