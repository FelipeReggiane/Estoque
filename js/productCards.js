const card = document.querySelector(".allCards");
const backButton = document.querySelector("#backButtonTable");

const renderCard = async () => {
    const url = "http://localhost:3000/products";
    const products = await fetch(url).then(response => response.json());

    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

    let template = "";
    
    for(let itens of products){
        itens = {
            ...itens,
            price: formatter.format(itens.price),
        }
        console.log(itens);
        template += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 id="productName">${itens.productName}</h5>
                <p id="department">${itens.department}</p>
                <p id="productDescription">${itens.productDescription}</p>
                <table class="table table-bordered">
                    <thead id="head">
                    <th>Price</th>
                    <th>Quantity</th>
                    </thead>
                    <td id="price">${itens.price}</td>              
                    <td id="productQuantity">${itens.productQuantity}</td>
                </table>
            </div>
        </div>
        `
    };

    card.innerHTML = template;
}

window.addEventListener("DOMContentLoaded", () => renderCard());

backButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href=("http://127.0.0.1:5500/home.html");
});