
let mainContainer = document.getElementById('mainContainer');
let selectBtnContainer = document.getElementById('selectContainer');
let selectBtn = document.getElementById('selectBtn');
let selectBtnValue = document.getElementById('selectBtn').value;
let productObj;
let productDiscounts;

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
};

domString = (productsData) => {
	let productString = '';	
	productsData.forEach(function(product){
		productString += 	`<div id='productCards' class='col-md-4 col-sm-6 thumbnail'>`;
		productString += 		`<h2>${product.name}</h2>`; 
		productString += 		`<h3>${product.department}</h3>`;
		productString += 		`<h4 class='clear basePrice'>${product.price}</h4>`;
		productString += 	 	`<h4 class='clear hidden2'>Sale Price: ${product.discountedPrice}</h4>`;
		productString += 	`</div>`;	  	  
	}); 			
	writeToDom(productString);
};

writeToDom = (productString) => {
	mainContainer.innerHTML = productString;
};

changeEventHandler = (e) => {
	let basePrice = document.getElementsByClassName('basePrice');
	let hidden1 = document.getElementsByClassName('hidden1');
	let hidden2 = document.getElementsByClassName('hidden2');
	let clear = document.getElementsByClassName('clear');
	for (let i = 0; i < productObj.length; i++) {	
		if (e.target.value === productObj[i].season) {			
			basePrice[i].classList.toggle('hidden1');
			hidden2[i].classList.toggle('display'); 			
		} else if (basePrice[i].classList.contains('hidden1') || hidden2[i].classList.contains('display')){
			basePrice[i].classList.remove('hidden1');
			hidden2[i].classList.remove('display'); 			
		};
	}; 
};

document.addEventListener('click', () => {
    selectBtn.onchange = changeEventHandler;
});

