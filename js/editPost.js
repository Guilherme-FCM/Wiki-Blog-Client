import ajax from './ajax.js'

window.onload = getPostData

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
    document.getElementById('titleInput').value = post.title
    document.getElementById('authorInput').value = post.author
    document.getElementById('contentTextarea').value = post.content
}

document.getElementById('sendPostButton').onclick = event => {
    event.preventDefault()
    
    let title = document.getElementById('titleInput').value
    let author = document.getElementById('authorInput').value
    let content = document.getElementById('contentTextarea').value
    sendPost({ title, author, content })
}

function sendPost(data){
    ajax(
        `/posts/update?id=${getIdPost()}&title=${data.title}&author=${data.author}&content=${data.content}`, 
        function(){
            if(this.readyState==4&&this.status==200){
                const response = JSON.parse(this.responseText)
                if (response.success){ redirect() } 
                else { console.log('Deu ruim') }
            }
        }
    )
}

function redirect(){ window.location.href = "index.html" }