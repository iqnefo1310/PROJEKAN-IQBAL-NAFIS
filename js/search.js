
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDI5NGFkZjUxNzU2NzA5YzBkYjQ5YTFkNjIxODEwMCIsIm5iZiI6MTcyMDg5NTA0MC42NDk0NTksInN1YiI6IjY2OGU4MmQ4MGExZmUxMmQzM2Q0OGE1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9-1kFAWCH6B-FHNvm-TyD6YuSyFU8A_9vWjKSacd-fc'
    }
};

let q = "be";
fetch(`https://api.themoviedb.org/3/search/collection?query=${q}&include_adult=false&language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => {
        // console.log(response.results);
        showHome(response);
    })
    .catch(err => console.error(err));

function showHome(response) {
    let col_1 = document.querySelector('.col-1');
    // clearChildren(col_1);  // Hapus konten sebelumnya
    // let page = document.querySelector('.page');
    // page.textContent = pageInt;

    response.results.forEach(movie => {
        let figure = document.createElement('figure');
        let overview = document.createElement('p');
        let image = document.createElement('img');
        let img_url = movie.poster_path;

        image.src = `https://image.tmdb.org/t/p/w500${img_url}`;
        overview.classList.add('overview');
        overview.textContent = `overview\n${movie.overview}`;

        figure.appendChild(image);
        figure.appendChild(overview);
        col_1.appendChild(figure);
    });
}