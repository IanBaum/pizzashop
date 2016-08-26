//Buisness logic
var sizeOptions = ["personal","medium","large"];
var sizePrices = [5.00,8.00,11.00];

var toppingOptions = ["olives","mushrooms","kale"];
var toppingPrices = [1.00,0.50,1.00];

var deliveryOptions = ["pickup","delivery"];
var deliveryPrices = [0.00,3.00];

function Pizza(){
  this.pizzaSize;
  this.toppings = [];
  this.price = 0;
  this.delivery = false;
}

Pizza.prototype.chooseSize = function(size,price){
  this.pizzaSize = size;
  this.price = price;
  $("#pizzaSize").text("Size: " + size);
  $("#pizzaSizeButtons").toggle();
  $("#pizzaToppings").toggle();
}

Pizza.prototype.printToppings = function(){
  $("#toppingList").empty();
  for(i=0;i<this.toppings.length;i++){
    $("#toppingList").append("<li>" + this.toppings[i]+ "</li>");
  }
}

Pizza.prototype.toggleTopping = function(name, price){
  if($.inArray(name, this.toppings) === -1){
    this.price += price;
    this.toppings.push(name);
    this.printToppings();
  }else{
    this.price -= price;
    this.toppings.splice($.inArray(name, this.toppings), 1);
    this.printToppings();
  }
}

Pizza.prototype.isDelivery = function(name,price){
  if(name != "pickup"){
    this.delivery = true;
    this.price += 3.00;
    $("#pizzaDelivery").toggle();
    $("#pizzaForm").toggle();
  }
  else{
    this.delivery = false;
    $("#pizzaDelivery").toggle();
    $("#pizzaPay").toggle();
  }
}

// User logic
$(document).ready(function(){
  var newPizza = new Pizza();
  var userName = "";
  for(i=0;i<sizeOptions.length;i++){
    $("#sizeButtons").append('<div class="col-sm-4"><div class="pizzaButton sizeButton" id="' + sizeOptions[i] + 'Button">' + sizeOptions[i] + '</div></div>');
  }
  for(i=0;i<toppingOptions.length;i++){
    $("#toppingButtons").append('<div class="col-sm-4"><div class="pizzaButton toppingButton" id="' + toppingOptions[i] + 'Button">' + toppingOptions[i] + '</div></div>');
  }
  for(i=0;i<deliveryOptions.length;i++){
    $("#deliveryButtons").append('<div class="col-sm-4"><div class="pizzaButton deliveryButton" id="' + deliveryOptions[i] + 'Button">' + deliveryOptions[i] + '</div></div>');
  }
  // for(i=0;i<sizeOptions.length;i++){
  //   $("#" + sizeOptions[i] + "Button").click(function(){
  //     newPizza.chooseSize(sizeOptions[i],sizePrices[i]);
  //   });
  // }


  $("#personalButton").click(function(){
    newPizza.chooseSize(sizeOptions[0],sizePrices[0]);
  });
  $("#mediumButton").click(function(){
    newPizza.chooseSize(sizeOptions[1],sizePrices[1]);
  });
  $("#largeButton").click(function(){
    newPizza.chooseSize(sizeOptions[2],sizePrices[2]);
  });


  $("#olivesButton").click(function(){
    newPizza.toggleTopping(toppingOptions[0],toppingPrices[0]);
  });
  $("#mushroomsButton").click(function(){
    newPizza.toggleTopping(toppingOptions[1],toppingPrices[1]);
  });
  $("#kaleButton").click(function(){
    newPizza.toggleTopping(toppingOptions[2],toppingPrices[2]);
  });
  $("#toppingBack").click(function(){
    $("#pizzaSizeButtons").toggle();
    $("#pizzaToppings").toggle();
  });
  $("#toppingNext").click(function(){
    $("#pizzaToppings").toggle();
    $("#pizzaDelivery").toggle();
  });


  $("#pickupButton").click(function(){
    newPizza.isDelivery(deliveryOptions[0],deliveryPrices[0]);
  });
  $("#deliveryButton").click(function(){
    newPizza.isDelivery(deliveryOptions[1],deliveryPrices[1]);
  });

  $("#formBack").click(function(){
    $("#pizzaDelivery").toggle();
    $("#pizzaForm").toggle();
    newPizza.price -= 3;
  });

  $("#userInfo").submit(function(event){
    event.preventDefault();
    username = $("#userName").val();
    $("#pizzaForm").toggle();
    $("#pizzaPay").toggle();
  })


  $(".pizzaButton").click(function(){
    $("#pizzaPrice").text("$" + newPizza.price.toFixed(2));
  });
});
