import {req, createCardProduct} from "./method.js"

req("https://fakestoreapi.com/products", showProductCard)


function showProductCard (arr = []) {
  const newElementsArr = arr.map(({title, description, image, price, category, id}) =>  {
    return  createCardProduct(title, price, category, image, description, addToBasket,  {title, description, image, price, category, id})
  }) 

    document.querySelector(".products")
    .append(...newElementsArr)
}

function addToBasket (info) {
  if(localStorage.product){
    const product = JSON.parse(localStorage.product);
    if(!Array.isArray(product)) {
      alert("перезавантажье сторінку")
    }
    if(info){
      product.push(info); 
    }
    localStorage.product = JSON.stringify(product);
  }else if (info){
    localStorage.product = JSON.stringify([info])
  } else{
    return
  }

  const productArr = JSON.parse(localStorage.product);

  const newArr = productArr.map((el) => {
  return   createProductBasket(el.title, el.price)
  })
  document.querySelector(".basket").innerHTML = ""
  document.querySelector(".basket").append(...newArr)
}

let savedDate = localStorage.getItem("savedDate");

if (!savedDate) {
  savedDate = getData();
  localStorage.setItem("savedDate", savedDate);
}

function createProductBasket(name, price) {
  const li = document.createElement("li");
  li.innerText = `Назва позиції: ${name}. Ціна: ${price} (${savedDate})`;
  return li;
}

addToBasket()

function getData () {
  // ГГ:ХХ:СС ДД.ММ.РРРР
  const date = new Date();
  const nowDate = 
  `${date.getHours() < 10 ? "0" + date.getHours(): date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes(): date.getMinutes()}:${date.getSeconds() < 10 ? "0" + date.getSeconds(): date.getSeconds()} ${date.getDate() < 10 ? "0" + date.getDate(): date.getDate()}.${(date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1): date.getMonth()+1}.${date.getFullYear()}`

  return nowDate
}