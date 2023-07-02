const accessKey: string = "ONkKXxb_cR_f3cCfPV2m4ZzOJr-PSjo6t0ZNkLpH1l8";
const formEl: HTMLFormElement | null = document.querySelector("form")!;
const searchInputEl: HTMLInputElement | null = document.getElementById(
  "search-input"
) as HTMLInputElement;
const searchResultsEl: HTMLElement | null =
  document.querySelector(".search-results")!;
const showMoreButtonEl: HTMLElement | null =
  document.getElementById("show-more-button")!;

let inputData: string = "";
let page: number = 1;

async function searchImages(): Promise<void> {
  inputData = searchInputEl?.value || "";
  const url: string = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response: Response = await fetch(url);
  const data: any = await response.json();
  if (page === 1) {
    searchResultsEl!.innerHTML = "";
  }

  const results: any[] = data.results;

  results.map((result: any) => {
    const imageWrapper: HTMLDivElement = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image: HTMLImageElement = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink: HTMLAnchorElement = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl!.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMoreButtonEl!.style.display = "block";
  }
}

formEl!.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl!.addEventListener("click", () => {
  searchImages();
});
