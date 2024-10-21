const row = document.querySelector(".row");

const getData = async (n) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/photos?_limit=${n}`
  );

  return res.data;
};

const setPhoto = async (n) => {
  const photos = await getData(n);

  row.innerHTML = "";
  photos.map((photo) => {
    console.log(photo);

    const col = document.createElement("div");
    col.className = `col-6 col-md-4 mb-3`;

    col.innerHTML = `
    <div class="shadow rounded">
                        <img src="${photo.thumbnailUrl}" class="w-100" alt="">
                    </div>
    `;
    row.appendChild(col);
  });
};

const showPhoto = () => {
  const input = document.querySelector("input");
  const n = input.value;
  console.log(n);

  setPhoto(n);
  input.value = "";
};
