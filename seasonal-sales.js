
// build a web page that lists all of the products, the name of the department it's in, and the price. Additionally, put a <select> element at the top of the page that contains all possible values of the season_discount key in the categories file.
let mainContainer = document.querySelector('#mainContainer');
let selectBtnContainer = document.querySelector('#selectContainer');
let selectBtn = document.querySelector('#selectBtn');
let selectBtnValue = document.querySelector('#selectBtn').value;
let productObj;

function productsJsonLoad() {
	let productsData = JSON.parse(this.responseText).products;
	getCatergories(productsData);
};

executeThisCodeIfFileErrors = () => {
	console.log('Error');
};

let productsRequest = new XMLHttpRequest;
productsRequest.addEventListener('load', productsJsonLoad);
productsRequest.addEventListener('error', executeThisCodeIfFileErrors);
productsRequest.open('GET', 'products.json');
productsRequest.send();

getCatergories = (productsData) => {
	let myRequest2 = new XMLHttpRequest;
	myRequest2.addEventListener('load', categoriesJsonLoad);
	myRequest2.addEventListener('error', executeThisCodeIfFileErrors);
	myRequest2.open('GET', 'categories.json');
	myRequest2.send();

	function categoriesJsonLoad() {
		let catergoriesData = JSON.parse(this.responseText).categories;
		combineArrays(productsData, catergoriesData);
	};
};

combineArrays = (productsData, catergoriesData) => {
	productsData.forEach(function(product){
		let currentProductId = product.category_id;
		//NESTED LOOP MATCHING ID'S OF ARRAYS
		// list all of the products, the name of the department they're in, and their prices.
		catergoriesData.forEach(function(category){
			if (currentProductId === category.id) {
			product.department = category.name;
			product.discount = category.discount;
			product.season = category.season_discount;
			product.discountedPrice = (product.price-(product.price*category.discount)).toFixed(2);
			
			}; 
		});
	});
	domString(productsData);
	productObj = productsData;
	console.log(productObj)	
};

domString = (productsData) => {
	let productString = '';	
	productsData.forEach(function(product){
		productString += `<div id='productCards'>`;
		productString += 	 `<h2>${product.name}</h2>`; 
		productString += 	 `<h3>${product.department}</h3>`;
		productString += 	 `<h4 class='basePrice'>${product.price}</h4>`;
		productString += 	 `<h4 class='hidden'>${product.discountedPrice}</h4>`;
		productString += `</div>`;	  
	}); 			
	writeToDom(productString);
};

writeToDom = (productString) => {
	mainContainer.innerHTML = productString;
};

// As soon as you select one of the seasons, all prices on the page should immediately be discounted by the corresponding percentage. For example, when Spring is chosen, all products in the corresponding Household category should have their prices updated with a 15% discount off the base price.

// You can have your dom string function print both the discounted price and the regular price (so you’d need to add discounted price as a property to each product in your array). Then you can have your change event on the select show and hide based on the season.

document.addEventListener('DOMContentLoaded', () => {
    selectBtn.onchange=changeEventHandler;
});

changeEventHandler = (e) => {
	for (let i = 0; i < productObj.length; i++) {
		// console.log(productObj[i])
		// console.log(e.target.value)		
		if (e.target.value === productObj[i]) {
			// document.querySelector('.basePrice').classList.add('hidden');
			// document.querySelector('.hidden').classList.remove('hidden');
			console.log(e.target.value)
		}	
	};
};


// function changeEventHandler(e) {
// 		for (let i = 0; i < productObj.length; i++) {
// 			if (e.target.value === productObj[i].discount) {
// 			productObj[i].price = productObj[i].price-(productObj[i].price*e.target.value);
// 			console.log('product object price', e, productObj[i].price)
// 		}	
// 	};
// 	console.log('event', e.target.value)
// 	domString(productObj);
// };



