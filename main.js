let carts = document.querySelectorAll('.add-cart');

let products = [
  {
    name: 'ADICOLOR TECH HOODIE - bluza z kapturem',
    tag: 'adidas_hoodie',
    producent: 'adidas Originals',
    price: 249.99,
    inCart: 0
  },
  {
    name: 'FRIENDS - T-shirt z nadrukiem',
    tag: 'friends_tshirt',
    producent: 'PULL&BEAR',
    price: 70,
    inCart: 0
  },
  {
    name: '3-STRIPE - Spodnie treningowe',
    tag: '3_stripes_shorts',
    producent: 'adidas Originals',
    price: 149,
    inCart: 0
  },
  {
    name: 'MARVEL-SWEATSHIRT - Bluza z kapturem',
    tag: 'marvel_sweatshirt',
    producent: 'PULL&BEAR',
    price: 109,
    inCart: 0
  },
  {
    name: 'WOMEN’S GLACIER SNAP NECK - Bluza z polaru',
    tag: 'north_face_polar',
    producent: 'The North Face',
    price: 299.99,
    inCart: 0
  },
  {
    name: 'CHUCK 70 - Sneakersy niskie',
    tag: 'converse_snickersy',
    producent: 'Converse',
    price: 349,
    inCart: 0
  },
  {
    name: 'LIFE WIDE CROPPED PANT - Spodnie materiałowe',
    tag: 'jd_spodnie',
    producent: 'JDY',
    price: 84,
    inCart: 0
  },
  {
    name: 'Even&Odd FRIENDS - T-shirt z nadrukiem',
    tag: 'friends_tshirt_dlaniej',
    producent: 'Even&Odd',
    price: 84,
    inCart: 0
  }
];

for (let i=0; i < carts.length; i++){
  carts[i].addEventListener('click', () => {
      cartNumbers(products[i]);
      totalCost(products[i]);

  })

}


function onLoadCartNumbers (){
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers){
    document.querySelector('#right-corner span').textContent = productNumbers;
  }

}

function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if ( productNumbers ){
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('#right-corner span').textContent = productNumbers + 1;
    }
    else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('#right-corner span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null){
      if(cartItems[product.tag] == undefined){
          cartItems = {
            ...cartItems,
            [product.tag]: product
          }
      }
      cartItems[product.tag].inCart += 1;
  }
  else {
    product.inCart = 1;
    cartItems = {
    [product.tag]: product
    }
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
       cartCost = parseInt(cartCost);
       localStorage.setItem("totalCost", cartCost + product.price);
    }
    else {
       localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem('totalCost');

  if (cartItems && productContainer) {
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
          productContainer.innerHTML += `
          <section class="products">
          <figure class="koszyk-produkt">
            <a href="#"><img src="../icons/close.png" class="koszyk-close" id="koszyk-close"></a>
            <img src="../images/${item.tag}.PNG" class="koszyk-picture">
              <section>

                <h1 class="koszyk-producent">${item.producent}</h1>
                <h1 class="koszyk-nazwa">${item.name}</h1>
                <h1 class="koszyk-ilosc">Ilość:<span>${item.inCart}</span></h1>
                <h1 class="koszyk-cena">${item.price}zł</h1>

              </section>
          </figure> 
        </section>
          `
      });

      
  }
}


function displayCart2(){
  let cartCost = localStorage.getItem("totalCost");
  cartCost = JSON.parse(cartCost);
  let productContainer = document.querySelector("#podsumowanie2");


  if (cartCost && productContainer) {
      productContainer.innerHTML = '';
      productContainer.innerHTML = `
      <section id="podsumowanie2">
      
      <h2>Podsumowanie:</h2>

      <p>Kwota za produkt/y:<span style="margin-left:50px;">${cartCost}zł</span></p>
      <p>Przesyłka:<span style="margin-left:140px;">15zł</span></p>

      <p style="font-weight:bold;">Łączna kwota:<span style="margin-left:81px;">${cartCost + 15}zł</span></p>

    </section>

      `;
      
  }
}



onLoadCartNumbers ();
displayCart();
displayCart2();

