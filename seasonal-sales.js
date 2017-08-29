
// build a web page that lists all of the products, the name of the department it's in, and the price. Additionally, put a <select> element at the top of the page that contains all possible values of the season_discount key in the categories file.
let mainContainer = document.querySelector('#mainContainer');
let selectBtnContainer = document.querySelector('#selectContainer');
let selectBtn = document.querySelector('#selectBtn').value;
// selectBtn.addEventListener('click', discountFunc)

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
			product.discountPrice = category.discount;
			}; 
		});
	});
	domString(productsData);
	// printSelectBtnDiscounts(catergoriesData);
};

domString = (productsData) => {
	let productString = '';	
	productsData.forEach(function(product){
		productString += `<div id='productCards'>`;
		productString += 	 `<h2>${product.name}</h2>`; 
		productString += 	 `<h3>${product.department}</h3>`;
		productString += 	 `<h3>${product.price}</h3>`;	
		productString += `</div>`;	  
	}); 			
	writeToDom(productString);
};

writeToDom = (productString) => {
	mainContainer.innerHTML = productString;
};

// printSelectBtnDiscounts = (discount) => {
// 	let string = '';
// 		string += `<h4>Seasonal Discounts</h4>`;
// 		string += `<select id="selectBtn">`;
//   		string += 	`<option value="" id='winterDiscount'>Winter (${discount[0].discount*100}%)</option>`;
//   		string += 	`<option value="" id='autumnDiscount>Autumn (${discount[1].discount*100}%)</option>`;
//   		string += 	`<option value="" id='springDiscount>Spring (${discount[2].discount*100}%)</option>`;
//   		string += `</select>`;
//   	// console.log('string',string)
// 	writeSelectToDom(string);
// };

// writeSelectToDom = (string) => {
// 	selectBtnContainer.innerHTML = string;
// };

// As soon as you select one of the seasons, all prices on the page should immediately be discounted by the corresponding percentage. For example, when Spring is chosen, all products in the corresponding Household category should have their prices updated with a 15% discount off the base price.

selectBtn.addEventListener('change', function(){
	if (selectBtn === 10) {
		product.price = product.price*0.1;
	} else if (selectBtn === 25) {
		product.price = product.price*0.25;
	} else if (selectBtn === 15) {
		product.price = product.price*0.15;
	}
});			





