// Albumni olish funksiyasi
const getAlbum = async (n) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/albums?_limit=${n}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching albums:", error);
  }
};

// Albomlarni UIga chiqarish funksiyasi
const showAlbum = () => {
  const input = document.querySelector("input");
  const n = input.value;
  console.log(n);

  displayAlbums(n);
  input.value = "";
};

const displayAlbums = async (n) => {
  const albumContainer = document.getElementById("album-container");
  const albums = await getAlbum(n);

  albums.forEach((album) => {
    const albumCard = document.createElement("div");
    albumCard.classList.add("album-card");

    albumCard.innerHTML = `
        <h2>Album ${album.id}</h2>
        <p><strong>User ID:</strong> ${album.userId}</p>
        <p><strong>Title:</strong> ${album.title}</p>
      `;

    albumContainer.appendChild(albumCard);
  });
};

displayAlbums();
