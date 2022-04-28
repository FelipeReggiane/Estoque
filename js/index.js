const headerTable = document.getElementById("head");
const bodyTable = document.getElementById("body");
const selectValue = document.querySelector("#select");
const filterMenu = document.getElementById("selectMenu")
const searchInputValue = document.querySelector("#searchProduct");
const buttonSearch = document.querySelector("#searchButton");
const backButton = document.querySelector("#backButtonTable");

const renderRow = async () => {
    const url = "http://localhost:3000/products";
    const products = await fetch(url).then(response => response.json());

    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

    let templateHead = "";

    let templateFilter = `
                <div class="select">
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" id="select">
                        <option selected>Select features</option>
                        <option value="productName">Product Name</option>
                        <option value="department">Department</option>
                        <option value="price">Price</option>
                        <option value="productAdjective">Product Adjective</option>
                        <option value="productMaterial">Product Material</option>
                        <option value="product">Product</option>
                        <option value="productDescription">Product Description</option>
                        <option value="productQuantity">Product Quantity</option>
                        <option value="minimunQuantity">Minimun Quantity</option>
                        <option value="totalValue">Total Value</option>
                        <option value="created_at">created_at</option>
                        <option value="updated_at">updated_at</option>
                    </select>
                 </div>
    `
    for(const key in products[0]){
        templateHead += ` 
        <th scope="col">${key}</th>
        `
    }
    
    
    let templateBody = "";
    for(let itens of products){
        templateBody += `<tr>`;
        itens = {
            ...itens,
            totalValue: formatter.format(itens.price * itens.productQuantity),
            price: formatter.format(itens.price),
        }
        for(const key in itens){
            templateBody += `
            
            <td> <a href="edit.html?id=${itens.id}" class="editButton"> ${itens[key]} </a> </td>
            `;
        }
        templateBody += "</tr>";
    }

    headerTable.innerHTML = templateHead;
    bodyTable.innerHTML = templateBody;
    filterMenu.innerHTML = templateFilter;
    
}

window.addEventListener("DOMContentLoaded", () => renderRow());

backButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href=("http://127.0.0.1:5500/home.html");
});


//Filter
buttonSearch.addEventListener("click", () => initFilter());

const initFilter = (e)=>{
    e.preventDefault();
    let filter = [selectValue.value, searchInputValue.value];
    console.log(filter);
    // renderRowFilter(filter);
    console.log(filter);

}

const renderRowFilter = async (filter) => {
    const url= `http://localhost:3000/products?${filter[0]}=${filter[1]}`;

    const products = await fetch(url).then(response => response.json());

    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

    let templateHead = "";
    
    for(const key in products[0]){
        templateHead += ` 
        <th scope="col">${key}</th>
        `
    }
    
    
    let templateBody = "";
    for(let itens of products){
        templateBody += "<tr>";
        itens = {
            ...itens,
            totalValue: formatter.format(itens.price * itens.productQuantity),
            price: formatter.format(itens.price),
        }
        for(const key in itens){
            templateBody += `
            
            <td> <a href="edit.html?id=${itens.id}" class="editButton"> ${itens[key]} </a> </td>
            `;
        }
        templateBody += "</tr>";
    }

    headerTable.innerHTML = templateHead;
    bodyTable.innerHTML = templateBody;
    
}