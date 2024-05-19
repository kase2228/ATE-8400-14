document.addEventListener("DOMContentLoaded", function() {
    const newsCards = document.querySelectorAll(".news-card");
    const viewCounts = document.querySelectorAll(".view-count");
    const likeCounts = document.querySelectorAll(".like-count");
    const dots = document.querySelectorAll(".pagination-dot");

    newsCards.forEach((card, index) => {
        const viewIcon = card.querySelector(".fa-eye");
        const likeIcon = card.querySelector(".fa-heart");

        viewIcon.addEventListener("click", () => {
            let views = parseInt(viewCounts[index].textContent);
            viewCounts[index].textContent = views + 1;
        });

        likeIcon.addEventListener("click", () => {
            let likes = parseInt(likeCounts[index].textContent);
            likeCounts[index].textContent = likes + 1;
        });
    });

    if (!getCookie("visited")) {
        viewCounts.forEach((count) => {
            let views = parseInt(count.textContent);
            count.textContent = views + 1;
        });
        setCookie("visited", true, 7);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index + 1);
        });
    });
});

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function showSlide(n) {
    const cards = document.querySelectorAll('.news-card');
    const dots = document.querySelectorAll('.pagination-dot');
    let start = (n - 1) * 3;

    cards.forEach((card, index) => {
        card.style.display = (index >= start && index < start + 3) ? 'flex' : 'none';
    });

    dots.forEach(dot => dot.classList.remove('active'));
    dots[n - 1].classList.add('active');
}

// Initialize the first slide
showSlide(1);


//appointment
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Here, you can perform form validation if needed

        // Show submission alert
        alert("Form submitted successfully! The doctor will respond soon.");
        this.reset(); // Reset the form fields
    });
});
// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Get form elements
    const form = event.target;
    const formData = new FormData(form);

    // You can perform additional validation here if needed

    // Construct the data object to send to the server
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Example: Send data to the server using fetch API
    fetch(form.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            // Handle successful submission
            console.log('Form submitted successfully');
            // Optionally, reset the form
            form.reset();
        } else {
            // Handle errors
            console.error('Error submitting form:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
    });
}

// Add event listener to the form for submit event
const form = document.querySelector('.appointment-form form');
form.addEventListener('submit', handleFormSubmit);
