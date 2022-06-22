const BASE_URL = "http://localhost:8080/Wiki-Blog"

export default function ajax(src, callback){
    let ajax = new XMLHttpRequest();
    let url = BASE_URL + src 
    ajax.open("GET", url, true);
    ajax.onreadystatechange = callback;
    ajax.send();
}

// function ajaxPostMethod(src, data, callback){
//     let ajax = new XMLHttpRequest();
//     ajax.onreadystatechange = callback;
//     ajax.open("POST", src, true);
//     ajax.setRequestHeader("Content-Type", "application/x-www-form-urlenconded")
//     ajax.send(data);
// }

    // const post = JSON.stringify({
    //     title: "Meu Novo Trabalho",
    //     author: "Guilherme",
    //     content: "Veja agora, trabalho na Nubank"
    // })
    // ajaxPostMethod(`${BASE_URL}/posts/insert`, data, getPosts)