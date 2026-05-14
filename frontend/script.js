const API = "http://localhost:5000/products";


// FETCH PRODUCTS
async function fetchProducts() {

    const response = await fetch(API);

    const products = await response.json();

    const search =
        document.getElementById("search")
            .value
            .toLowerCase();

    const filter =
        document.getElementById("filter")
            .value;

    const filteredProducts =
        products.filter(product => {

            const matchSearch =
                product.name
                    .toLowerCase()
                    .includes(search);

            const matchFilter =
                filter === "" ||
                product.category === filter;

            return matchSearch &&
                matchFilter;
        });

    const productList =
        document.getElementById("productList");

    productList.innerHTML = "";

    let totalValue = 0;

    filteredProducts.forEach(product => {

        totalValue +=
            product.price *
            product.quantity;

        const div =
            document.createElement("div");

        div.classList.add("product");

        div.innerHTML = `

            <h3>${product.name}</h3>

            <p>
                Category:
                ${product.category}
            </p>

            <p>
                Price:
                ₹${product.price}
            </p>

            <p>
                Quantity:
                ${product.quantity}
            </p>

            <p class="total">
                Total:
                ₹${product.price * product.quantity}
            </p>

            ${product.quantity < 5
                ?
                `<p class="low-stock">
                    ⚠ Low Stock
                 </p>`
                :
                ""
            }

            <button
                class="edit-btn"
                onclick="editProduct(
                    '${product._id}',
                    '${product.name}',
                    '${product.category}',
                    '${product.price}',
                    '${product.quantity}'
                )">

                Edit

            </button>

            <button
                class="delete-btn"
                onclick="deleteProduct(
                    '${product._id}'
                )">

                Delete

            </button>
        `;

        productList.appendChild(div);
    });


    document.getElementById(
        "totalProducts"
    ).innerText =
        filteredProducts.length;

    document.getElementById(
        "totalValue"
    ).innerText =
        `₹${totalValue}`;
}


// SAVE PRODUCT
async function saveProduct() {

    const id =
        document.getElementById("productId")
            .value;

    const name =
        document.getElementById("name")
            .value;

    const category =
        document.getElementById("category")
            .value;

    const price =
        document.getElementById("price")
            .value;

    const quantity =
        document.getElementById("quantity")
            .value;


    if (!name ||
        !category ||
        !price ||
        !quantity) {

        alert("Please fill all fields");

        return;
    }


    const productData = {
        name,
        category,
        price,
        quantity
    };


    if (id) {

        await fetch(`${API}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(
                productData
            )
        });

    } else {

        await fetch(`${API}/add`, {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(
                productData
            )
        });
    }


    clearForm();

    fetchProducts();
}


// EDIT PRODUCT
function editProduct(
    id,
    name,
    category,
    price,
    quantity
) {

    document.getElementById(
        "productId"
    ).value = id;

    document.getElementById(
        "name"
    ).value = name;

    document.getElementById(
        "category"
    ).value = category;

    document.getElementById(
        "price"
    ).value = price;

    document.getElementById(
        "quantity"
    ).value = quantity;
}


// DELETE PRODUCT
async function deleteProduct(id) {

    await fetch(`${API}/${id}`, {

        method: "DELETE"
    });

    fetchProducts();
}


// CLEAR FORM
function clearForm() {

    document.getElementById(
        "productId"
    ).value = "";

    document.getElementById(
        "name"
    ).value = "";

    document.getElementById(
        "category"
    ).value = "";

    document.getElementById(
        "price"
    ).value = "";

    document.getElementById(
        "quantity"
    ).value = "";
}


fetchProducts();