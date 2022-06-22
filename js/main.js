import ajax from './ajax.js'

window.onload = getAllPosts

function getAllPosts(){
    ajax('/posts', getResult);
}

function getResult(){
    if(this.readyState==4&&this.status==200){
        showPosts(this.responseText)
    }
}

function showPosts(response){
    const posts = JSON.parse(response)
    posts.forEach(post => {
        addPostCard( createPostCard(post) )
    })
}

function createPostCard(post){
    return `
    <div class="card">
        <h5 class="card-header">${post.author}</h5>
        <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.content}</p>
            <a href="#" class="btn btn-primary">Ver mais</a>
        </div>
    </div><br>
    `
}

function addPostCard(postCard){
    document.getElementById('posts').innerHTML += postCard
}