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
    ap.on('play', function () {
        avatar.style.animationPlayState = "running";
    });
    ap.on('pause', function () {
        avatar.style.animationPlayState = "paused";
    });
}
// End APlayer

// Like
const ButtonLike = document.querySelector("[btn-like]");
if(ButtonLike) {
    ButtonLike.addEventListener("click",() => {
        const id = ButtonLike.getAttribute("btn-like");
        const isActive = ButtonLike.classList.contains("active");
        let status = "";
        if(isActive) {
            ButtonLike.classList.remove("active");
            status="dislike";
        }else {
            ButtonLike.classList.add("active");
            status= "like";
        }
        const api = `/songs/like`;
        const data = {
            id: id,
            status: status
        }
        fetch(api,{
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data =>{
                if(data.code==200) {
                    ButtonLike.querySelector("span").innerHTML= data.newLike;
                }
            })
    })
}

// End Like