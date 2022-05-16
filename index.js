const gamesList = document.getElementById('gamesList');
const searchBar = document.getElementById('searchBar');
const dropdown = document.querySelector('#genre-dropdown');

fetchFavoriteGames()

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
		'X-RapidAPI-Key': '6d2bda3efcmsh34e293e369fc6b0p140e22jsn8a1bb82394dd'
	}
};

function fetchData(){
    fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
	.then(response => response.json())
	.then(data => {
        searchGames(data)
        dropdownGames(data)})
	.catch(err => console.error(err));
}
fetchData()

//Search Bar
function searchGames(data){
    searchBar.addEventListener('keypress', (e) => {

        if (e.key === 'Enter' && e.target.value !==''){
            let searchString = e.target.value.toLowerCase();
            const filteredGames = data.filter((game) =>game.title.toLowerCase().includes(searchString));
            e.target.value=''
        displayGames(filteredGames);
        } 
    })
}

// const EMPTY_HEART = '♡'
// const FULL_HEART='💓'

//Display Games
function displayGames(data){
    // console.log(data)
    data.forEach((game)=>{
        const showGame=document.createElement('div')
        const showGameTitle=document.createElement('h2')
        const img=document.createElement('img')
        const a=document.createElement('a')
        const button=document.createElement('btn')
        showGame.setAttribute('class', 'card')
        img.setAttribute('class', 'game-image')
        const span=document.createElement('span')

        span.innerHTML='&#x2661'

        let isClicked = false;
        span.addEventListener('click', (e)=>{
            isClicked = !isClicked;
            if(isClicked){
                e.target.innerHTML='&#128147'
                let favoriteGame=e.target.parentElement
                console.log(e.target.parentElement)
                postFavoriteGame(favoriteGame)
            } else{
                e.target.innerHTML='&#x2661'
            }
        })

        showGameTitle.textContent=game.title
        img.src=game.thumbnail
        button.setAttribute("class", "click-btn")
        button.textContent=('Play')
        a.href=game.game_url
        button.addEventListener('click', linkFunction)
        function linkFunction() {
            window.location.href=game.game_url
        }
        a.append(button)
        showGame.append(showGameTitle, img, button, span, a)
        gamesList.append(showGame)

        button.addEventListener('mouseover', (e)=>{
            e.target.style.color='red'
        })
        button.addEventListener('mouseout', (e)=>{
            e.target.style.color='white'
        })
   }
   )
}

function postFavoriteGame(favoriteGame){
    let favoriteGameTitle=favoriteGame.querySelector('h2').innerText
    let favoriteGameURL=favoriteGame.querySelector('img').src
    let favoriteGameLink=favoriteGame.querySelector('a').href
    fetch('http://localhost:3000/games',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
        {title : favoriteGameTitle,
        thumbnail: favoriteGameURL,
        game_url: favoriteGameLink}
    ),
  })
  .then(response => response.json())
  .catch(error=>console.error('Error:', error))
}


function fetchFavoriteGames(){
    fetch('http://localhost:3000/games')
	.then(response => response.json())
	.then(data => displayGames(data))
	.catch(err => console.error(err));
}
//Dropdown Bar
function dropdownGames(data){
    dropdown.addEventListener('change', (e) => {
        const gameGenre = e.target.value
        const filteredGames = data.filter(game => {
           return gameGenre === game.genre
        })
        displayGames(filteredGames)
})
}
//Clear Game Display
function clearSearchList(){
    searchBar.addEventListener('click', ()=>{
        gamesList.innerText=''
    })
    dropdown.addEventListener('click', ()=>{
        gamesList.innerText=''
    })
}
clearSearchList()