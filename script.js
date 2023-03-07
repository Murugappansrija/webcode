const maindiv = document.createElement("div")
maindiv.setAttribute("class","productss-container")
maindiv.setAttribute("id","productss-container")

let searching = document.createElement("input")
searching.setAttribute("id","search")
searching.setAttribute("onkeyup","filtersreaching(this)")
document.body.append(searching)
document.body.append(maindiv)

const url = "https://makeup-api.herokuapp.com/api/v1/products.json"
const productssContainer = document.getElementById("productss-container");
const searchInput = document.getElementById("search");
let productss = [];

function filtersreaching(target) {
  const search = target.value.toLowerCase();
  const searchMatch = productss.filter((element) => {
    const name = element.name.toLowerCase();
    return name.includes(search);
  });
  gettingcardss(searchMatch);
}

async function gettingdata() {
  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    productss = [...data];
    gettingcardss(productss);
  }
}
gettingdata();

function gettingcardss(data = []) {
  
  let cards = [];
  for (let i = 0; i < data.length; i++) {
    cards.push(newcardss(data[i]));
  }
  
  productssContainer.innerHTML = "";
  
  productssContainer.append(...cards);
}

function newcardss(data = {}) {
  let card = document.createElement("div");
  let imgdiv= document.createElement("div");
  let imgess = document.createElement("img")
 
  
  let brandsss = document.createElement("h5");
  let nameofproduct = document.createElement("h6");
  let rate= document.createElement("h6")
  let pdiv =document.createElement("div")
  let ratesyl= document.createElement("h6")
  let desscription = document.createElement("p")
 


  card.setAttribute("class", "card");

  
  const { brand = "",name = "",price="",description="",image_link="" } = data;
  brandsss.innerText = brand;
  nameofproduct.innerText = name;
  rate.innerText= price;
  desscription.innerText = description;
  ratesyl.innerText= '$';
  imgess.src = "image_link "
  imgdiv.append(imgess)
  pdiv.setAttribute("class","pdiv")
  pdiv.append(ratesyl,rate)
  
  card.append(imgdiv,brandsss, nameofproduct,pdiv,desscription);

  return card;
}
