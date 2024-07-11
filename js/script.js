const apiUrl = "http://localhost:3000/photos"

// getting form inputs
let photoAlbum = document.getElementById('album').value
let photUrl = document.getElementById('image').value
let photoThumbnail = document.getElementById('thumb').value
let PhotoTitle = document.getElementById('title').value

// Getting All Resources

fetch(apiUrl)
.then(res => res.json())
.then(photos => photos.forEach(photo => createPhoto(photo)))


// function to create single photo div

function createPhoto(photo){
    const {albumId, id, title, url, thumbnailUrl} =  photo

    let wrapper = document.getElementById("photo-wrapper")

    const divCard = document.createElement('div')
    divCard.className = 'photo'


    const html = `
            <div>
            <img src=${thumbnailUrl}>
            </div>
            <div>
            <h3>Title: ${title}</h3>
            </div>
            <div>
            <button><a href=${url} target="_blank">View Image</a></button>
            </div>
            <div class="btn"><button type="button" id="delete" onclick = "deletePhoto(${id})">Delete</button><button type="button" id="edit" onclick= " editPhoto(${albumId}, ${id})">Edit</button></div>

    `
    divCard.innerHTML = html

    wrapper.appendChild(divCard)


}

// Posting a resource

let form = document.getElementById('form')

form.addEventListener('submit', e =>  {

    // prevent form for reloading
    e.preventDefault()
    
    

    // creating object from form input
    const formData = {
        albumId : photoAlbum,
        url : photUrl,
        thumbnailUrl: photoThumbnail,
        title: PhotoTitle
    }
   
    // sending data to the server using fetch api
    fetch(apiUrl, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(photo => console.log(photo))


})

// Deleting a resource

function deletePhoto(id){
    console.log(id)

    fetch(`${apiUrl}/${id}`, {
        method : "DELETE"
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

// Editing Photo

function editPhoto(albumId, id){
   

    // updating form inputs

     photoAlbum = albumId
    //  photUrl = url
    //  photoThumbnail = thumbnailUrl
    //  PhotoTitle = title


}

// fetch(`${apiUrl}/${id}`, {
//     method : "PATCH",
//     headers : {
//         "Content-Type" : "application/json",
//         "Accept" : "application/json"
//     },
//     body : JSON.stringify({

//     })
// })
// .then(res => res.json())
// .then(photo => console.log(photo))
