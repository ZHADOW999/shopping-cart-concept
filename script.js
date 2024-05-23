let cart = [];

function addToCart(product, price) {
    cart.push({ product, price });
    displayCart();
}

function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    cart.forEach((item, index) => {
        cartDiv.innerHTML += `<p>${item.product} - $${item.price} <button onclick="removeFromCart(${index})">Remove</button></p>`;
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    customer=window.prompt("what is your name ?");
    const orderDetails = cart.map(item => `${item.product} - $${item.price}`).join('\n');
    const templateParams = {
        from_name: customer,
        message: orderDetails,
        total_price: cart.reduce((total, item) => total + item.price, 0)
    };

    emailjs.send('service_g1w5cp7', 'template_lkjykt9', templateParams)
        .then((response) => {
            alert('Order placed successfully!');
            cart = [];
            displayCart();
        }, (error) => {
            alert('Failed to place order. Please try again.');
        });
}
