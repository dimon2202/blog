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
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  loading.style.display = "flex";

  // Fetch posts data
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
      loading.style.display = "none";

      const sliderWrapper = document.querySelector(".swiper-wrapper");

      posts.slice(0, 10).forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("swiper-slide");
        postElement.innerHTML = `<div><h3>${post.title}</h3><p>${post.body}</p></div>`;
        sliderWrapper.appendChild(postElement);
      });

      const swiper = new Swiper(".swiper-container", {
        slidesPerView: 3,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    });

  // Fetch users data
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
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
          window.location.href = `user.html?id=${user.id}`;
        });
        userList.appendChild(userElement);
      });
    });
});
