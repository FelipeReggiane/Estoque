const editProduct = document.querySelector(".editBody");
const deleteBtn = document.querySelector(".deletButton");
const editBtn = document.querySelector("editBtn");
const backButton = document.querySelector("#backButtonTable");

const id = new URLSearchParams(window.location.search).get("id");

let formHTML_form;

const editTable = async () => {
    const url = "http://localhost:3000/products/" + id;
    const products = await fetch(url).then(response => response.json());
    
    let templateEdit = "";

    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

    templateEdit += `
        <form id="editForm">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <P id="productNameP">Product Name</P>
                        <input type="text" name="productName" value="${products.productName}">
                    </div>
                    <div class="col">
                        <P id="departmentP">Department</P>
                        <input type="text" name="department" value="${products.department}">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <P id="productAdjectiveP">Product Adjective</P>
                        <input type="text" name="productAdjective" value="${products.productAdjective}">
                    </div>
                    <div class="col">
                        <P id="productMaterialP">Product Material</P>
                        <input type="text" name="productMaterial" value="${products.productMaterial}">
                    </div>
                    <div class="col">
                        <P id="productP">Product</P>
                        <input type="text" name="product" value="${products.product}">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <p id="productDescriptionP">Product Description</p>
                    <textarea id="productDescription">${products.productDescription}</textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <P id="priceP">Price</P>
                        <input type="text" name="price" value="${products.price}">
                    </div>
                    <div class="col">
                        <P id="productQuantityP">Product Quantity</P>
                        <input type="text" name="productQuantity" value="${products.productQuantity}">
                    </div>
                    <div class="col">
                        <P id="minimumQuantityP">Minimum Quantity</P>
                        <input type="text" name="minimunQuantity" value="${products.minimunQuantity}">
                    </div>
                    <div class="col">
                        <p id="totalValueP">Total Value</p>
                        <input type="text" name="totalValue" value="${products.productQuantity*products.price}">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <P id="created_atP">created_at</P>
                        <input type="text" name="created_at" value="${products.created_at}">
                    </div>
                    <div class="col">
                        <p id="updated_atP">updated_at</p>
                        <input type="text" name="updated_at" value="${products.updated_at}">
                    </div>
                </div>
                <button class="editBtn">Edit</button>
                </div>
            </form>
                `;

    
    editProduct.innerHTML= templateEdit;
    formHTML_form = document.getElementById("editForm");
    formHTML_form.addEventListener("submit", (e) => setProduct(e));
}

window.addEventListener("DOMContentLoaded", () => editTable());
deleteBtn.addEventListener("click", () => deleteProduct());

const setProduct = async (e) => {
    e.preventDefault();

    const itens = {
        id,
        productName: formHTML_form.productName.value,
        department: formHTML_form.department.value,
        price: formHTML_form.price.value,
        productAdjective:formHTML_form.productAdjective.value,
        productMaterial:formHTML_form.productMaterial.value,
        product:formHTML_form.product.value,
        productDescription:formHTML_form.productDescription.value,
        productQuantity:formHTML_form.productQuantity.value,
        minimunQuantity:formHTML_form.minimunQuantity.value,
        totalValue:null,
        created_at:formHTML_form.created_at.value,
        updated_at:formHTML_form.updated_at.value,
    };

    const url = "http://localhost:3000/products/" + id;
    await fetch(url, {
        method:"PUT",
        body: JSON.stringify(itens),
        headers: {"Content-Type": "application/json"},
        });
}

const deleteProduct = async () => {
    const url = "http://localhost:3000/products/" + id;
    const validation = confirm("Tem certeza que deseja apagar este produto?");
    if(validation){
        await fetch(url, {
            method:"DELETE",
            });
        window.location.replace("http://127.0.0.1:5500/home.html");
    }
}

backButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href=("http://127.0.0.1:5500/home.html");
});