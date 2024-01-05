document.addEventListener("DOMContentLoaded", function () {

  function getCurrentDate() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const currentDate = new Date();
    return currentDate.toLocaleDateString("en-US", options);
  }
  document.getElementById("current-date").textContent = getCurrentDate();

  const loading = document.getElementById("loading");
  const slider = document.getElementById("slider");
  const userList = document.getElementById("userList");
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');

  // Show loading spinner while fetching posts data
  loading.style.display = "flex";

  // Fetch posts data
//   fetch("https://jsonplaceholder.typicode.com/posts")
//     .then((response) => response.json())
//     .then((posts) => {
//       // Hide loading spinner after data is loaded
//       loading.style.display = "none";

//       posts.slice(0, 10).forEach((post) => {
//         const postElement = document.createElement("div");
//         postElement.classList.add("post");
//         postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
//         slider.appendChild(postElement);
//       });
//     });




    // Fetch posts data
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        // Hide loading spinner after data is loaded
        loading.style.display = 'none';

        const sliderWrapper = document.querySelector('.swiper-wrapper');

        posts.slice(0, 10).forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('swiper-slide');
            postElement.innerHTML = `<div><h3>${post.title}</h3><p>${post.body}</p></div>`;
            sliderWrapper.appendChild(postElement);
        });

        // Initialize Swiper
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        });












  // Fetch users data
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      // Hide loading spinner after data is loaded
      loading.style.display = "none";

      users.forEach((user) => {
        const userElement = document.createElement("li");
        userElement.classList.add("user");
        // Fetch user's photo from the photos endpoint
        fetch(`https://jsonplaceholder.typicode.com/photos/${user.id}`)
          .then((response) => response.json())
          .then((photo) => {
            userElement.innerHTML = `<img src="${photo.thumbnailUrl}" alt="User Photo"><h3>${user.name}</h3><p>${user.email}</p>`;
          });

        userElement.addEventListener("click", () => {
          // Redirect to user's blog page
          window.location.href = `user.html?id=${user.id}`;
        });
        userList.appendChild(userElement);
      });
    });

    //  // Slider navigation
    //  let currentIndex = 0;

    //  function updateSlider() {
    //      const scrollPosition = currentIndex * 302; // Considering 1rem margin
    //      slider.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    //  }

    //  prevButton.addEventListener('click', () => {
    //      if (currentIndex > 0) {
    //          currentIndex--;
    //          updateSlider();
    //      }
    //  });

    //  nextButton.addEventListener('click', () => {
    //      const maxIndex = slider.children.length - 1;
    //      if (currentIndex < maxIndex) {
    //          currentIndex++;
    //          updateSlider();
    //      }
    //  });
});
