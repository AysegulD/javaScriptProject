const mscContainer = document.querySelector('.container')
const playBtn = document.querySelector('#play')
const prev = document.querySelector('#previous')
const frwrd = document.querySelector('#forward')
const audio = document.querySelector('#audio')
const title = document.querySelector('#title')
const artist = document.querySelector('#singer')
const cover = document.querySelector('#cover')
const progressRange = document.querySelector('#progressRange')
const durationTime = document.querySelector('#durationTime')
const currentTime = document.querySelector('#currentTime')
const slide = document.querySelector('.slide')


const songs = ['Instant Crush','Hysteria','Wonderwall']
const artists = ['Daft Punk','Muse','Oasis']

let songIndex = 0;

loadSong (songs[songIndex])
function loadSong (song) {
    title.textContent = songs[songIndex]
   artist.textContent = artists[songIndex]
    audio.src = `music/${song}.mp3`
    cover.src =`images/${song}.jpg`
   bodyImg.src = `images/${song}.jpg`
}

function playSong () {
    mscContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play-circle')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
    
}
function pauseSong () {
    mscContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play-circle')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    audio.pause()
}

audio.addEventListener('ended',frwrdSong)

function frwrdSong () {
    songIndex++
    console.log(songIndex)
if (songIndex > songs.length-1) {
    songIndex = 0
    }
    loadSong (songs[songIndex])  
    playSong ()
}

function previousSong () {
    songIndex--
if (songIndex < 0) {
    songIndex = songs.length -1
    }
    loadSong (songs[songIndex])  
    playSong ()
}
function progressSong () {
    progressRange.max = audio.duration;
    progressRange.value = audio.currentTime;
    currentTime.textContent  = updateTime (audio.currentTime)
    durationTime.textContent = updateTime (audio.duration)
}
setInterval (progressSong,1000)

function updateTime (sec) {
    let min = Math.floor (sec / 60)
    let seconds = Math.floor (sec - min * 60)
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    return `${min}:${seconds}`
}
function changeProgressBar () {
    audio.currentTime = progressRange.value
}
progressRange.addEventListener ('click',changeProgressBar)

slide.addEventListener ('input',function () {
    audio.volume = slide.value / 100;
});

playBtn.addEventListener('click',() => {
    const isPlaying = mscContainer.classList.contains('play')
    if (isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})

prev.addEventListener('click',previousSong)
frwrd.addEventListener('click',frwrdSong)

