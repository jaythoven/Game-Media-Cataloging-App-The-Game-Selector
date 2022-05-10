const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
        'X-RapidAPI-Key': '6d2bda3efcmsh34e293e369fc6b0p140e22jsn8a1bb82394dd'
    }
};
fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
    .then(response => response.json())
    .then(gameData => displayGames(gameData))
    .catch(err => console.error(err));

const gamesList = document.getElementById('gamesList');

const displayGames = () => {
    for(const game of displayGames)
    let imgGames = document.querySelector('img')
    imgGames.src = game.thumbnail
    gamesList.append(imgGames)
}

    // function displayGames(data){
    //     data.forEach((game)=>{
    //         const showGame=document.createElement('div')
    //         const showGameTitle=document.createElement('h2')
    //         const img=document.createElement('img')
    
    //         showGameTitle.textContent=game.title
    //         img.src=game.thumbnail
    //         showGame.append(showGameTitle, img)
    //         gamesList.append(showGame)
    //     })
    // }

