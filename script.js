// Initialize cart from localStorage or set as empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add product to cart
function addToCart(productName, productPrice) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Regular alert for adding to cart
    alert(`${productName} has been added to your cart.`);
}

// Update cart count badge
function updateCartCount() {
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    document.getElementById('cart-count').innerText = itemCount;
}

// Toggle cart sidebar visibility
function toggleCartSidebar() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
    displayCartItems();
}

// Display items in the cart sidebar
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.innerText = `${item.name} x${item.quantity}`;
        
        const priceSpan = document.createElement('span');
        priceSpan.classList.add('text-success');
        priceSpan.innerText = `$${(item.price * item.quantity).toFixed(2)}`;
        
        listItem.appendChild(priceSpan);
        cartItemsContainer.appendChild(listItem);
        
        total += item.price * item.quantity;
    });

    document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`;
}

// Checkout function with SweetAlert
function checkout() {
    Swal.fire({
        title: 'Proceed to Checkout',
        text: 'Are you sure you want to checkout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Checkout!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            cart = [];
            updateCartCount();
            toggleCartSidebar();

            Swal.fire({
                title: 'Checkout Successful!',
                text: 'Your cart has been cleared.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    });
}

// Initial load setup
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

// Function to close the cart sidebar
function closeCartSidebar() {
    toggleCartSidebar();
    document.getElementById('overlay').classList.remove('active');
}

function navigateToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  }
  


// formValidation
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Prevent form submission to check validation
    event.preventDefault();

    // Clear any previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';

    // Get form field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let valid = true;

    // Validate Name
    if (name === '') {
      document.getElementById('nameError').textContent = 'Name is required.';
      valid = false;
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === '') {
      document.getElementById('emailError').textContent = 'Email is required.';
      valid = false;
    } else if (!emailPattern.test(email)) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address.';
      valid = false;
    }

    // Validate Message
    if (message === '') {
      document.getElementById('messageError').textContent = 'Message cannot be empty.';
      valid = false;
    }

    // If form is valid, submit it
    if (valid) {
      this.submit();
    }
  });