const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

// Maximum high scores displayed
const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

// Prevents user for clicking save w/o entering their initials
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

// Prevents user from registering empty spaces
function keyDown(e) { 
    var e = window.event || e;
    var key = e.keyCode;
    //space pressed
     if (key == 32) { //space
      e.preventDefault();
     }         
}

// Save scores to leaderboard
saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('./index.html')

    
}