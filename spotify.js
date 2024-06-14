const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById('search-bar');
const speedSlider = document.getElementById('speed-slider');
const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause');
const playPauseImage = playPauseButton.querySelector('img');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const nowPlayingTitle = document.getElementById('now-playing-title');
const nowPlayingImage = document.getElementById('now-playing-image');
const playlistElement = document.getElementById('playlist');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');

const songs = [
    { title: 'Aaj ke baad', url: 'songs/1.mp3', image: 'assets/thumbnail/1.jpg' },
    { title: 'Aakhiyan gulaab', url: 'songs/2.mp3', image: 'assets/thumbnail/2.jpg' },
    { title: 'chaleya', url: 'songs/3.mp3', image: 'assets/thumbnail/3.jpg' },
    { title: 'Devil dosent barkin', url: 'songs/4.mp3', image: 'assets/thumbnail/4.jpg' },
    { title: 'Dil jhoom', url: 'songs/5.mp3', image: 'assets/thumbnail/5.jpg' },
    { title: 'Dopamine addict', url: 'songs/6.mp3', image: 'assets/thumbnail/4.jpg' },
    { title: 'Heeriye', url: 'songs/7.mp3', image: 'assets/thumbnail/7.jpg' },
    { title: 'Hipocrite', url: 'songs/8.mp3', image: 'assets/thumbnail/4.jpg' },
    { title: 'Speekers', url: 'songs/9.mp3', image: 'assets/thumbnail/4.jpg' },
    { title: 'I sent my theripist to therapy', url: 'songs/10.mp3', image: 'assets/thumbnail/4.jpg' },
    { title: 'Jaadui', url: 'songs/11.mp3', image: 'assets/thumbnail/11.jpg' },
    { title: 'Jaan hai meri', url: 'songs/12.mp3', image: 'assets/thumbnail/12.jpg' },
    { title: 'Jauban dhan', url: 'songs/13.mp3', image: 'assets/thumbnail/13.jpg' },
    { title: 'Kalank', url: 'songs/14.mp3', image: 'assets/thumbnail/14.jpg' },
    { title: 'Le aaunga', url: 'songs/15.mp3', image: 'assets/thumbnail/15.jpg' },
    { title: 'Let me down slowly', url: 'songs/16.mp3', image: 'assets/thumbnail/4.jpg' },
    { title: 'Main rahoon ya na rahoo', url: 'songs/17.mp3', image: 'assets/thumbnail/17.jpg' },
    { title: 'Mann jogiya', url: 'songs/18.mp3', image: 'assets/thumbnail/18.jpg' },
    { title: 'Mannat', url: 'songs/19.mp3', image: 'assets/thumbnail/19.jpg' },
    { title: 'Pasoori', url: 'songs/21.mp3', image: 'assets/thumbnail/20.jpg' },
    { title: 'Phir aur kya chahiye', url: 'songs/22.mp3', image: 'assets/thumbnail/22.jpg' }

];

let currentSongIndex = 0;




searchIcon.addEventListener('click', () => {
    searchBar.classList.toggle('show'); // Toggle the visibility of the search bar
});

searchBar.addEventListener('input', () => {
    const searchText = searchBar.value.toLowerCase();
    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(searchText));
    updatePlaylist(filteredSongs);
});

function updatePlaylist(filteredSongs) {
    playlistElement.innerHTML = ''; // Clear existing playlist
    filteredSongs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.addEventListener('click', () => {
            currentSongIndex = songs.findIndex(s => s.title === song.title);
            loadSong(currentSongIndex);
            audioPlayer.play();
            playPauseImage.src = 'assets/logoes/pause.svg';
        });
        playlistElement.appendChild(li);
    });
}

// Initial setup of the playlist
setupPlaylist();






function updatePlaybackSpeed() {
    audioPlayer.playbackRate = speedSlider.value;
}
speedSlider.addEventListener('input', updatePlaybackSpeed);



function loadSong(songIndex) {
    const song = songs[songIndex];
    audioPlayer.src = song.url;
    nowPlayingTitle.textContent = song.title;
    nowPlayingImage.src = song.image;
    audioPlayer.load();
}

function playPauseSong() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseImage.src = 'assets/logoes/pause.svg';
    } else {
        audioPlayer.pause();
        playPauseImage.src = 'assets/logoes/play.svg';
    }
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseImage.src = 'assets/logoes/pause.svg';
}

function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseImage.src = 'assets/logoes/pause.svg';
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
}

function updateTimeIndicators() {
    const currentTimeElement = document.getElementById('current-time');
    const totalDurationElement = document.getElementById('total-duration');
    
    currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
    totalDurationElement.textContent = formatTime(audioPlayer.duration);
}


function updateProgressBar() {
    const { currentTime, duration } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    updateTimeIndicators();
}





function setupPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            audioPlayer.play();
            playPauseImage.src = 'assets/logoes/pause.svg';
        });
        playlistElement.appendChild(li);
    });
}

playPauseButton.addEventListener('click', playPauseSong);
nextButton.addEventListener('click', playNextSong);
prevButton.addEventListener('click', playPrevSong);
audioPlayer.addEventListener('timeupdate', updateProgressBar);
audioPlayer.addEventListener('ended', playNextSong);

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
});

volumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value;
});

loadSong(currentSongIndex);
setupPlaylist();







