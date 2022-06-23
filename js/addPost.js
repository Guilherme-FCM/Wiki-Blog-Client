import ajax from './ajax.js'

document.getElementById('sendPostButton').onclick = event => {
    event.preventDefault()
    
    let title = document.getElementById('titleInput').value
    let author = document.getElementById('authorInput').value
    let content = document.getElementById('contentTextarea').value
    sendPost({ title, author, content })
}

function sendPost(data){
    ajax(
        `/posts/insert?title=${data.title}&author=${data.author}&content=${data.content}`, 
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