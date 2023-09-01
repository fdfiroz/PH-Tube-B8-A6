
const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const uiData = (await response.json()).data;
  const tabContainer = document.getElementById("catagory-container");
  uiData.forEach((category) => {
    const tab = document.createElement("div");
    tab.classList = "tab-item";
    tab.innerHTML = `<button id='${category?.category_id}' onclick="handleCategoryClick(${category?.category_id})" class="btn-sm text-black hover:bg-rose-600 hover:text-white focus:text-white focus:bg-rose-600 join-item active:bg-rose-600" >${category?.category}</button>`;
    tabContainer.appendChild(tab);
  });
  handleCategoryClick(uiData[0]?.category_id);
};

const handleCategoryClick = async (id) => {
  const uiData = await fetchCategoryData(id);

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if (uiData.length === 0) {
    const card = createNoContentCard();
    cardContainer.appendChild(card);
  }

  uiData.forEach((video) => {
    const card = createVideoCard(video);
    cardContainer.appendChild(card);
  });
};

const handleSort = () => {
  const cardContainer = document.getElementById("card-container");
  const cards = cardContainer.querySelectorAll(".card");

  const cardArray = [];
  cards.forEach((card) => cardArray.push(card));

  cardArray.sort((a, b) => {
    const aViews = parseInt(a.querySelector(".card-actions p span").innerText);
    const bViews = parseInt(b.querySelector(".card-actions p span").innerText);
    return bViews - aViews;
  });

  cardContainer.innerHTML = "";
  cardArray.forEach((card) => {
    cardContainer.appendChild(card);
  });
};

const handleBlog = () => {
  window.location.href = "./blog.html";
};

const handleVideo = () => {
  window.location.href = "./index.html";
};

const timeClock = (sec) => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - hours * 3600) / 60);
  return `${hours}hrs ${minutes}min ago`;
};

const fetchCategoryData = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const uiData = (await response.json()).data;
  return uiData;
};

const createNoContentCard = () => {
  const card = document.createElement("div");
  card.classList =
    "flex flex-col justify-center card col-span-4 place-self-center	w-1/4";
  card.innerHTML = `
            <img src="./image/Icon.png" alt="">
            <h1 class="text-center text-neutral-900 text-[32px] font-bold leading-[44px]">Oops!! Sorry, There is no content here</h1>
        `;
  return card;
};

const createVideoCard = (data) => {
  const card = document.createElement("div");

  card.innerHTML = `
            <div class=" card card-compact w-80 bg-base-100 shadow-xl">
            
            <figure class="rounded relative w-80 h-48"><img class="h-full w-full" src="${
              data.thumbnail
            }" alt="image" />
                <span class="${
                  data?.others?.posted_date ? "" : "hidden"
                } countdown bg-gray-900 text-white text-sm absolute z-50 bottom-3 right-3">
                ${timeClock(data?.others?.posted_date)}
                </span>
            </figure>
            <div class="flex flex-row">
              <div class="avatar">
                <div class="w-10 h-10 rounded-full ml-4 mt-5">
                  <img src="${data?.authors[0]?.profile_picture}" />
                </div>
              </div>
              <div class="card-body">
                <h2 class="card-title">${data.title}</h2>
                <p>${
                  data?.authors[0]?.profile_name || "No Data"
                } <span class="inline-flex justify-center align-middle">
                    <img class="${
                      data?.authors[0]?.verified ? "" : "hidden"
                    }" src="./image/verified.svg" alt="">
                    </span></p>
                <div class="card-actions justify-end">
                    <p><span>${
                      data?.others?.views ? data?.others?.views : "No View"
                    }</span> views</p>
              </div>
              </div>
            </div>
            
        </div>
            `;
  return card;
};

handleCategory();
