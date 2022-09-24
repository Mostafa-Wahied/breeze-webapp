

const apiKey = "563492ad6f917000010000017b41c9e869be405899a86cede70b8f2b";
const baseURL = "https://api.pexels.com/videos/search?query=nature&per_page=1";
function fetchVideo() {
    fetch(baseURL,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: apiKey
        }
    })
    .then(res => res.json())
    .then(data => {
        displayVideo(data);
        console.log(data);
        // return data
    })
}

// fetchVideo();

function displayVideo(videos) {
    let allVideos = videos.videos;
    let videoLink = allVideos[0].video_files[6].link;
    console.log(allVideos[0].video_files);
    console.log(allVideos[0].video_files[3]);
    document.querySelector(".video").src = videoLink;
}


const currentLocation = location.href;
const menuItem = document.querySelectorAll('a');
const menuLength = menuItem.length
for (let i = 0; i<menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].className= "active"
    }
}