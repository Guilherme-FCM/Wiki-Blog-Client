const BASE_URL = "http://localhost:8080/Wiki-Blog"

export default function ajax(src, callback){
    let ajax = new XMLHttpRequest();
    let url = BASE_URL + src 
    ajax.open("GET", url, true);
    ajax.onreadystatechange = callback;
    ajax.send();
}