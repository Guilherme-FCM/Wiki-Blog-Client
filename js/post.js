import ajax from './ajax.js'

window.onload = () =>{
    getPostData()
    getComments()
}

function getIdPost() {
    const url = new URL(window.location.href)
    return url.searchParams.get("id")
}

function getPostData(){
    ajax(`/posts?id=${getIdPost()}`, function(){
        if(this.readyState==4&&this.status==200){
            const response = JSON.parse(this.responseText)
            if (response != null){ setPostData(response) } 
            else { console.log('Deu ruim') }
        }
    })
}

function setPostData(post){
    document.getElementById('title').innerHTML = post.title
    document.getElementById('author').innerHTML = post.author
    document.getElementById('content').innerHTML = post.content
    document.getElementById('modificationDate').innerHTML = post.modificationDate
    document.getElementById('editPostLink').href = `editPost.html?id=${post.id}`
}

function getComments(){
    ajax(`/comments?id_post=${getIdPost()}`, function(){
        if(this.readyState==4&&this.status==200){
            const response = JSON.parse(this.responseText)
            if (response != null){ setCommentList(response) } 
            else { console.log('Deu ruim') }
        }
    })
}

function setCommentList(comments){
    comments.forEach(comment => {
        addLiComment( createLiComment(comment) )
    })
}

function createLiComment(comment){
    return `<li class="list-group-item">${comment.content}</li>`
}

function addLiComment(liCommentElement){
    document.getElementById('commentList').innerHTML += liCommentElement
}

document.getElementById('addComment').onclick = function(){
    document.getElementById('liComment').classList.remove('d-none')
    document.getElementById('cancelComment').classList.remove('d-none')
    this.classList.add('d-none')
}

document.getElementById('cancelComment').onclick = function(){
    document.getElementById('liComment').classList.add('d-none')
    document.getElementById('addComment').classList.remove('d-none')
    this.classList.add('d-none')
}

document.getElementById('buttonComment').onclick = function(){
    const idPost = getIdPost()
    let comment = document.getElementById('inputComment').value
    ajax(
        `/comments/insert?id_post=${idPost}&content=${comment}`,
        function(){ 
            if(this.readyState==4&&this.status==200){
                const response = JSON.parse(this.responseText)
                if (response.success){ window.location.reload() } 
                else { console.log('Deu ruim') }
            }
        }
    )
}

document.getElementById('btnDeletePost').onclick = () => {
    fetch(`http://localhost:8080/Wiki-Blog/posts/delete?id=${getIdPost()}`)
        .then(response => response.json())
        .then(data => {
            if (data.success){ redirect() } 
            else { console.log('Deu ruim') }
        })
    // ajax(`posts/delete?id=${getIdPost()}`, function(){
    //     if(this.readyState==4&&this.status==200){
    //         const response = JSON.parse(this.responseText)
    //         if (response.success){ redirect() } 
    //         else { console.log('Deu ruim') }
    //     }
    // })
}

function redirect(){ window.location.href = "index.html" }