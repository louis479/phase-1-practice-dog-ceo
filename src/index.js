console.log('%c HI', 'color: firebrick');

document.addEventListener("DOMContentLoaded", () => {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  let breeds = {}; // To store all breeds globally

  // Fetch and render dog images
  fetch(imgUrl)
    .then((response) => response.json())
    .then((data) => {
      const imageContainer = document.getElementById("dog-image-container");
      data.message.forEach((imageUrl) => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "A random dog";
        imageContainer.appendChild(img);
      });
    });

  // Fetch and render breeds
  fetch(breedUrl)
    .then((response) => response.json())
    .then((data) => {
      breeds = data.message; // Store fetched breeds
      renderBreeds(breeds);
    });

  // Function to render breeds
  function renderBreeds(breeds, filter = null) {
    const breedList = document.getElementById("dog-breeds");
    breedList.innerHTML = ""; // Clear the list before rendering

    for (const breed in breeds) {
      if (!filter || breed.startsWith(filter)) {
        const li = document.createElement("li");
        li.textContent = breed;

        // Add click event listener to change color
        li.addEventListener("click", () => {
          li.style.color = "blue";
        });

        breedList.appendChild(li);
      }
    }
  }

  // Handle breed filtering
  const breedDropdown = document.getElementById("breed-dropdown");
  breedDropdown.addEventListener("change", (event) => {
    const selectedLetter = event.target.value;
    renderBreeds(breeds, selectedLetter);
  });
});
