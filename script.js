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

  // Show loading spinner while fetching posts data
  loading.style.display = "flex";

  // Fetch posts data
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
      // Hide loading spinner after data is loaded
      loading.style.display = "none";

      posts.slice(0, 10).forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        slider.appendChild(postElement);
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
});
