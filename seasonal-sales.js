
// build a web page that lists all of the products, the name of the department it's in, and the price. Additionally, put a <select> element at the top of the page that contains all possible values of the season_discount key in the categories file.
let mainContainer = document.querySelector('#mainContainer');

let jsonProductArray = [];
let jsonProductId = [];
let jsonProductName = [];
let jsonProductPrice = [];
let jsonProductCatergoryId = [];

let jsonCatergoriesArray = [];
let jsonCatergoriesId = [];
let jsonCatergoriesName = [];
let jsonCatergoriesSeasonDiscount = [];
let jsonCatergoriesDiscount = [];

let count = 0;

jsonProductsKeyValues = () => {
	jsonProductArray.forEach(function(index){
		jsonProductId = index.id;
		jsonProductName = index.name;
		jsonProductPrice = index.price;
		jsonProductCatergoryId = index.category_id;
		console.log(jsonProductId, jsonProductName, jsonProductPrice, jsonProductCatergoryId)
	});
};

jsonCatergoryKeyValues = () => {
	jsonCatergoriesArray.forEach(function(index){
		jsonCatergoriesId = index.id;
		jsonCatergoriesName = index.name;
		jsonCatergoriesSeasonDiscount = index.season_discount;
		jsonCatergoriesDiscount = index.category_discount;
		console.log(jsonCatergoriesId, jsonCatergoriesName, jsonCatergoriesSeasonDiscount, jsonCatergoriesDiscount)
	});
};

// Put a <select> element at the top of the page that contains all possible values of the season_discount key in the categories file. 

counter = () => {
	count++
	if (count === 2) {
		domProducts();
		jsonProductsKeyValues();
		jsonCatergoryKeyValues();
		console.log("Ya got 2!!")
	};
};

domProducts = () => {
	let productString = '';	
	jsonProductArray.forEach(function(index){
			productString += `<div id='productCards'>`;
			productString += 	 `<h2>${index.name}</h2>`; 
			if (index.category_id === 1) {
			productString += 	 `<h3>${jsonCatergoriesArray[0].name}</h3>`;
			} else if (index.category_id === 2) {
				productString += 	 `<h3>${jsonCatergoriesArray[1].name}</h3>`;	
			} else if (index.category_id === 3) {
				productString += 	 `<h3>${jsonCatergoriesArray[2].name}</h3>`;	
			}
			productString += 	 `<h4>${index.price}</h4>`;
			productString += `</div>`;	  
	}); 			
	writeToDom(productString);
};

writeToDom = (productString) => {
	mainContainer.innerHTML = productString;
};

function productsJsonLoad() {
	// console.log('this', this.responseText);
	let data = JSON.parse(this.responseText);
	jsonProductArray = data.products;
	counter();
	// console.log(jsonProductArray)
};

function categoriesJsonLoad() {
	// console.log('this', this.responseText);
	let data = JSON.parse(this.responseText)
	jsonCatergoriesArray = data.categories;
	counter();
	// console.log(jsonCatergoriesArray)
};

executeThisCodeIfFileErrors = () => {
	console.log('Error');
};

let myRequest1 = new XMLHttpRequest();
myRequest1.addEventListener('load', productsJsonLoad);
myRequest1.addEventListener('error', executeThisCodeIfFileErrors);
myRequest1.open('GET', 'products.json');
myRequest1.send();

let myRequest2 = new XMLHttpRequest();
myRequest2.addEventListener('load', categoriesJsonLoad);
myRequest2.addEventListener('error', executeThisCodeIfFileErrors);
myRequest2.open('GET', 'categories.json');
myRequest2.send();

