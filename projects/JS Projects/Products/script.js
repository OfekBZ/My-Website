let totalPrice = 0;

window.onload = () => {
    if (localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.forEach(item => {
            addItemToTable(item.name, item.price);
            totalPrice += item.price;
        });
        document.getElementById("totalPrice").innerText = totalPrice;
    }
}

function saveToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addItem() {
    let name = document.getElementById("name").value.trim();
    let price = document.getElementById("price").value.trim();

    // Regex to check if name is only text (no numbers allowed)
    let nameRegex = /^[A-Za-z\s]+$/;

    // Regex to check if price is a valid number greater than 0
    let priceRegex = /^[1-9]\d*(\.\d+)?$/;

    if (!nameRegex.test(name)) {
        alert("Please enter a valid product name (letters and spaces only).");
        return;
    }

    if (!priceRegex.test(price) || price <= 0) {
        alert("Please enter a valid price (greater than 0 and a valid number).");
        return;
    }

    price = parseFloat(price);  // Convert to float if it's a valid number

    let item = { name, price };
    addItemToTable(name, price);

    totalPrice += price;
    document.getElementById("totalPrice").innerText = totalPrice;

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    saveToLocalStorage(cart);
}

function addItemToTable(name, price) {
    let table = document.getElementById("products");
    let row = table.insertRow();
    row.innerHTML = `<td>${name}</td><td>${price}₪</td>`;
}
