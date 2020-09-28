
const $inputSearch = document.getElementById('search')
const $response = document.getElementById('response')
const $responseContainer = document.getElementById('responseCards')
const $searchBtn = document.getElementById('search-btn')


let products = [
  {
    name: 'Audi x R',
    price: 440000,
    img: URL="img/Audi xR.jpg"
  },
  {
    name: 'Audi new z speed',
    price: 623300,
    img: URL="img/Audi.jpg"
  },
  {
    name: 'Ford autow',
    price: 4431207,
    img: URL="img/ford autow.jpg"
  },
  {
    name: 'ford flesta Y Green',
    price: 480000,
    img: URL="img/ford flesta Y Green.jpg"
  },
  {
    name: 'Toyotal Impresora HP Ink Tank 315 - HP',
    price: 399685,
    img: URL="img/ford fordx.jpg"
  },
  {
    name: 'ford everesta056 w',    //
    price: 410000,
    img: URL="img/ford-everesta056.jpg"
  },
  {
    name: 'ford ranger-wall-n',
    price: 378000,
    img: URL="img/ford-ranger-wall-n.jpg"
  },
  {
    name: 'ford leasead 5f',
    price: 360000,
    img: URL="img/fordleasead5f.jpg"
  },
  {
    name: 'Lam Lamborghini nxyz',
    price: 840000,
    img: URL="img/Lamborghini.jpg"
  },
  {
    name: 'Mer Mercedes',
    price: 340000,
    img: URL="img/Mercedes.jpg"
  },
  {
    name: 'To Toyotal Yaris',
    price: 550000,
    img: URL="img/Toyotal Yaris.jpg"
  },

]


const searchProduct = product => {
  if(product) {
    $responseContainer.innerHTML = ''

    products.forEach((el, i) => {
      let item = el.name.toLowerCase().split(' ')
      let filter = item.indexOf(product)

      if ( item[filter] === product ) {
        renderProducts(el)
      }
    })

  }
}


const renderProducts = (product) => {
  $response.style.opacity = 1
  $responseContainer.innerHTML += `
  <article class="card">
    <img src="${product.img}" alt="" class="card-img">
    <span class="card-price">$ ${product.price}</span>
    <p class="card-description">${product.name}</p>
  </article>
  `
}



$inputSearch.addEventListener('keyup', e => {
  if(e.target.value.length > 0) {
    searchProduct($inputSearch.value.toLowerCase())
  } else {
    $responseContainer.innerHTML = ''
  }
})



$searchBtn.addEventListener('click', e => {
  console.log(e)
  if($inputSearch.value.length > 0) {
    searchProduct($inputSearch.value.toLowerCase())
  } else {
    $responseContainer.innerHTML = ''
  }
})
