// Uploads Images
const upLoadImages = document.querySelector("[upload-image]");
if (upLoadImages) {
    const inputUploadImage = document.querySelector("[upload-image-input]");
    const ImguploadsImage = document.querySelector("[upload-image-preview]");
    inputUploadImage.addEventListener("change",(e) => {
        const file = e.target.files[0];
        if (file) {
            ImguploadsImage.src = URL.createObjectURL(file);
        }
    })
}
// End Uploads Images


// Previews Audio
const upLoadAudio = document.querySelector("[upload-audio]");
if (upLoadAudio) {
    const inputUploadAudio = upLoadAudio.querySelector("[upload-audio-input]");
    const audiouploadPlay = upLoadAudio.querySelector("[file-upload-audio]");
    const Sourceupload =audiouploadPlay.querySelector("source");
    console.log(Sourceupload);
    inputUploadAudio.addEventListener("change",(e) => {
        const file = e.target.files[0];
        if (file) {
            Sourceupload.src = URL.createObjectURL(file);
            audiouploadPlay.load();
        }
    })
}
// End Previews Audio