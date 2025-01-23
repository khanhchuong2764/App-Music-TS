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