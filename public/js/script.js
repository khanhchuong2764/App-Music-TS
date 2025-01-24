// APlayer
const AplayerSong = document.querySelector("#aplayer");
if(AplayerSong) {
    let Song = AplayerSong.getAttribute("data-song");
    let Singer = AplayerSong.getAttribute("data-singer");
    Song = JSON.parse(Song);
    Singer = JSON.parse(Singer);
    const ap = new APlayer({
        container: AplayerSong,
        lrcType: 1,
        audio: [{
            name: Song.title,
            artist: Singer.fullName,
            url: Song.audio,
            cover: Song.avatar,
            lrc: `${Song.lyrics}`
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
    const spanListen = document.querySelector(".inner-listen span")
    ap.on('ended', function () {
        fetch(`/songs/listen/${Song._id}`,{
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data =>{
                if(data.code == 200) {
                    spanListen.innerHTML = data.listen;
                }
            })
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

// Favorite Song
const btnFavoriteSong = document.querySelectorAll("[btn-favorite]");
if(btnFavoriteSong.length > 0) {
    btnFavoriteSong.forEach(button => {
        button.addEventListener("click",() => {
            const id = button.getAttribute("btn-favorite");
            button.classList.toggle("active");
            const api = `/songs/favorite`;
            const data = {
                id: id
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
                        console.log("Thành công");
                    }
                })
        })
    })
    
}

// End Favorite Song

// Search Suggest
const boxSearch  = document.querySelector(".box-search");
if(boxSearch) {
    const input = boxSearch.querySelector("input[name='keyword']");
    const innerSuggest = boxSearch.querySelector(".inner-suggest");
    const innerList = boxSearch.querySelector(".inner-list");
    input.addEventListener("keyup",() => {
        const value = input.value;
        fetch(`/search/suggest?keyword=${value}`)
            .then(res => res.json())
            .then(data =>{
                if(data.songs.length > 0) {
                    const html = data.songs.map(item => `
                        <a class="inner-item" href="/songs/detail/${item.slug}">
                            <div class="inner-image">
                                <img src="${item.avatar}">
                            </div>
                            <div class="inner-info">
                                <div class="inner-title">${item.title}</div>
                                <div class="inner-singer">
                                    <i class="fa-solid fa-microphone-lines"></i> ${item.singerFullName}
                                </div>
                            </div>
                        </a>
                    `
                    )
                    innerSuggest.classList.add("show");
                    innerList.innerHTML = html.join("");
                }else { 
                    innerSuggest.classList.remove("show");
                    innerList.innerHTML = "";
                }
            })
    })
}


// End Search Suggest

// Listen



// End Listen
