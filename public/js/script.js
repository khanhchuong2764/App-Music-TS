// APlayer
const AplayerSong = document.querySelector("#aplayer");
if(AplayerSong) {
    let Song = AplayerSong.getAttribute("data-song");
    let Singer = AplayerSong.getAttribute("data-singer");
    Song = JSON.parse(Song);
    Singer = JSON.parse(Singer);
    const ap = new APlayer({
        container: AplayerSong,
        audio: [{
            name: Song.title,
            artist: Singer.fullName,
            url: Song.audio,
            cover: Song.avatar
        }],
        autoplay:true
    });
    const avatar = document.querySelector(".singer-detail .inner-avatar");
    console.log(avatar);
    ap.on('play', function () {
        avatar.style.animationPlayState = "running";
    });
    ap.on('pause', function () {
        avatar.style.animationPlayState = "paused";
    });
}

// End APlayer