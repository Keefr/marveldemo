$(document).ready(() => {
  $("#searchForm").on('submit', (e) => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    getComics(searchText);
  });
});

function getComics(searchText){
  axios.get("http://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&title=" + searchText + "&issueNumber=1&orderBy=issueNumber%2ConsaleDate&limit=10&ts=1&apikey=9235b7495fcfa520bb895d2c13143831&hash=16822e4bb4711764eacabd97c8210e8a")
  .then((response) => {
    console.log(response);
    let comics = response.data.data.results;
    let output = '';
    $.each(comics, (index, comic) => {
      output += `
        <div class="row">
        <div class="col-md-4">
            <img src="${comic.thumbnail.path}/portrait_uncanny.jpg">
          </div>
          <div class="col-md-10">
            <h1>${comic.title}</h1>
            <ul class="list-group">
              <li class="list-group-item"><strong>Story:</strong> ${comic.description}</li>
            </ul>
          </div>
          </div>
        </div>

        `;
      });

      $('#comics').html(output);
    })
  .catch((err) => {
    console.log(err);
  });
}
