const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDI5NGFkZjUxNzU2NzA5YzBkYjQ5YTFkNjIxODEwMCIsIm5iZiI6MTcyMDg1OTgwNS41OTM2ODcsInN1YiI6IjY2OGU4MmQ4MGExZmUxMmQzM2Q0OGE1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._bV4WlGtjGGaaoWkibMvyi5cD61i7rVqUQ2Xki9m28s'
  }
};
let id_detail = '';
let pageInt = 1;
let cache = {};

function getMovie() {
  if (cache[pageInt]) {
    showHome(cache[pageInt]);
  } else {
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${pageInt}&sort_by=popularity.desc`, options)
      .then(response => response.json())
      .then(response => {
        cache[pageInt] = response;  // Simpan hasil ke cache
        console.log(response.results)
        showHome(response);
      })
      .catch(err => console.error(err));//memeritahukan eror
  }
}

function clearChildren(element) {//function untuk menghapus page sebelumnya
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function showHome(response) {
  let col_1 = document.querySelector('.col-1');
  clearChildren(col_1);  // Hapus konten sebelumnya
  let page = document.querySelector('.page');
  page.textContent = pageInt;

  response.results.forEach(movie => {
    let figure = document.createElement('figure');
    let title = document.createElement('p');
    let image = document.createElement('img');
    let img_url = movie.poster_path;
    let link = document.createElement('a');

    link.setAttribute('href', '../html/detail.html');
    image.src = `https://image.tmdb.org/t/p/w500${img_url}`;
    title.classList.add('title');
    title.textContent = `\n${movie.title}`;

    figure.appendChild(image);
    figure.appendChild(link);
    col_1.appendChild(figure);
    link.appendChild(title);
    link.addEventListener('click', () => {
      localStorage.setItem('id_detail_movie', JSON.stringify(movie.id));
      localStorage.setItem('detail_movie', JSON.stringify(movie));
    });
  });
}

const prev = document.querySelector(".prev-nav");
prev.addEventListener("click", () => {
  if (pageInt > 1) {
    pageInt--;
    getMovie();
  }
});

const next = document.querySelector(".next-nav");
next.addEventListener("click", () => {
  if (pageInt < 30) {
    pageInt++;
    getMovie();
  }
});

getMovie();