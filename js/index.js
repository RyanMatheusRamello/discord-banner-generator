const TextElement = document.querySelector("#item-title");
const TextB = document.querySelector("#background-text");
const TitleElement = document.querySelector("#center-text-div");
const BackgroundInput = document.querySelector("#item-background");
const TextColorInput = document.querySelector("#item-text");
const AnimeGirl = document.querySelector("#anime-girl");
const ImageWidth = document.querySelector("#image-width");
const ImageHeight = document.querySelector("#image-height");
const ImageFile = document.querySelector("#image-element");
const BtnSave = document.querySelector("#save");

function saveAs(uri, filename) {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);

    } else {

        window.open(uri);

    }
}

BtnSave.addEventListener("click", function(e){
    e.preventDefault();
    domtoimage.toPng(document.querySelector("#preview"), {
        height: 375,
        width: 666,
    }).then(dataURL => {
        saveAs(dataURL, "image.png");
    });
})

ImageFile.addEventListener("change", function(){
    const [file] = ImageFile.files;
    if(file){
        AnimeGirl.src = URL.createObjectURL(file)
    }
})

TextElement.addEventListener("keyup", function(){
    const value = TextElement.value.replace(/<|>/g, "");
    TitleElement.textContent = value
    TextB.innerHTML = `<span>${value}<br></span>
        <span class="inverted">${value}<br></span>
        <span>${value}<br></span>
        <span class="inverted">${value}<br></span>
    `;
});

ImageWidth.addEventListener("keyup", function(){
    const value = ImageWidth.value;
    AnimeGirl.style.width = value + "px";
});

ImageHeight.addEventListener("keyup", function(){
    const value = ImageHeight.value;
    AnimeGirl.style.height = value + "px";
});

BackgroundInput.addEventListener("change", function(){
    const color = BackgroundInput.value;
    document.querySelector(':root').style.setProperty('--background', color);
})

BackgroundInput.addEventListener("keyup", function(){
    const color = BackgroundInput.value;
    document.querySelector(':root').style.setProperty('--background', color);
})

TextColorInput.addEventListener("change", function(){
    const color = TextColorInput.value;
    document.querySelector(':root').style.setProperty('--text-color', color);
})

TextColorInput.addEventListener("keyup", function(){
    const color = TextColorInput.value;
    document.querySelector(':root').style.setProperty('--text-color', color);
});

let startResizePxLeft = -1;
let startResizePxTop = -1;

function initResize(e) {
    window.addEventListener('mousemove', Resize, false);
    window.addEventListener('mouseup', stopResize, false);
}

let resizeEnable = false;

function Resize(e) {
    if(startResizePxLeft === -1 && startResizePxTop === -1){
        startResizePxLeft = e.clientX - AnimeGirl.offsetLeft;
        startResizePxTop = e.clientY - AnimeGirl.offsetTop;
    }else{
        AnimeGirl.style.left = (e.clientX - startResizePxLeft) + 'px';
        AnimeGirl.style.top = (e.clientY - startResizePxTop) + 'px';
    }
}
//on mouseup remove windows functions mousemove & mouseup
function stopResize(e) {
    window.removeEventListener('mousemove', Resize, false);
    window.removeEventListener('mouseup', stopResize, false);
    startResizePxLeft = -1;
    startResizePxTop = -1;
}

AnimeGirl.addEventListener('mousedown', initResize, false);