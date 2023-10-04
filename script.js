
function LoadCategories(){
    fetch("http://fakestoreapi.com/products/categories")
    .then(function(response){
     return response.json();
    })
    .then(function(categories){
     categories.unshift("all");
     for(var category of categories){
         var option=document.createElement("option");
         option.text=category.toUpperCase();
         option.value=category;
         document.getElementById("lstCategories").appendChild(option);
     }
    })
 }
 function LoadProducts(url){
     fetch(url)
     .then(function(response){
         return response.json();
     })
     .then(function(products){
         document.querySelector("main").innerHTML="";
      for(var product of products){
         var div=document.createElement("div");
         div.className="card m-2 p-2";
         div.style.width="200px";
         div.innerHTML=`
         <img src=${product.image} class="card-img-top" height="150" width="160">
         <div class="card-header" style="height:130px">
            <p>${product.title}</p>
         </div> 
         <div class="card-body">
            <dl>
             <dt>Price<dt>
             <dd>${product.price}</dd>
             <dt>Rating</dt>
             <dd><span class="bi bi-star-fill text-success"><span>${product.rating.rate}[${product.rating.count}]<dd>
            </dl>
         </div>
         <div class="card-footer">
            <button class="btn btn-warning w-100" onclick="AddClick(${product.id})"><span class="bi bi-cart4"></span>Add to Cart<button>
         </div>        
         `;
         document.querySelector("main").appendChild(div);
      }
     })
 }
 function bodyload(){
     LoadCategories();
     LoadProducts("http://fakestoreapi.com/products");
     GetcartItemsCount();
 }
 function CategoryChanged(){
    var categoryName=document.getElementById("lstCategories").value;
    if(categoryName=="all"){
     LoadProducts("http://fakestoreapi.com/products");
    }else{
      LoadProducts(`http://fakestoreapi.com/products/category/${categoryName}`)
    }
 }
function NavClicked(categoryName){
  if(categoryName=="all"){
     LoadProducts("http://fakestoreapi.com/products");
  }else{
     LoadProducts(`http://fakestoreapi.com/products/category/${categoryName}`)
  }
}
var cartItems=[];
function GetcartItemsCount(){
  document.getElementById("lblCount").innerHTML=cartItems.length;
}
function AddClick(id){
  fetch(`http://fakestoreapi.com/products/${id}`)
  .then(function(response){
     return response.json();
  })
  .then(function(product){
     cartItems.push(product);
     alert(`${product.title}\nAdded to cart`);
     GetcartItemsCount()
  })
}
function ShowClick(){
  document.querySelector("tbody").innerHTML="";
  for(var item of cartItems){
     var tr=document.createElement("tr")
     var tdName=document.createElement("td")
     var tdPrice=document.createElement("td");
     var tdPreview=document.createElement("td");
     var tdAction=document.createElement("td");

     tdName.innerHTML=item.title;
     tdPrice.innerHTML=item.price;
     tdPreview.innerHTML=`<img src=${item.image} width="50" height="50">`;
     tdAction.innerHTML=`<button class="btn btn-danger"><span class="bi bi-trash"></span></button>`;

     tr.appendChild(tdName);
     tr.appendChild(tdPrice);
     tr.appendChild(tdPreview);
     tr.appendChild(tdAction);

     document.querySelector("tbody").appendChild(tr)
  }
}
function FilterClick(){
      var categoriesCheckBoxList=document.getElementById("category");
      for(var item of categoriesCheckBoxList){
        if(item.checked){
           console.log(item.value); 
        }
      }
}