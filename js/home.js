const button = document.querySelector("#searchEditButton");
const input = document.querySelector("#searchText");

const searchById = () =>{
    const id = input.value;
    console.log(id)
    if(id>=1){
        window.location.href=(`http://127.0.0.1:5500/edit.html?id=${id}`);
    }else{
        window.location.href=(`http://127.0.0.1:5500/create.html`);
    }
}

button.addEventListener("click", (e) => {
    e.preventDefault;
    searchById();
});
