let allRecipeis = "https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza"
let singleRecipe = " https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"


async function renderDatatoUi(recipes) {
    // console.log(recipes);
    let foods = recipes.map((recipe) => {
        return `
         <div id="myLoader"></div> 
        <div class="foodList" id=${recipe.id} onclick=showSingleItem(this)>
                <div id="foodImage">
                    <img src=${recipe.image_url}
                        alt="foodimage">
                </div>
                <div id="foodInfo">
                    <h2 id="foodTitle">${recipe.title}</h2>
                    <p style="margin-top: 10px;">${recipe.publisher}</p>
                </div>
            </div>`
    })
    foodMenu.innerHTML = foods.join("");
}

async function getfoodDataApi(recipeName = "pizza") {
    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeName}`)
        const result = await response.json();

        if (!result) {
            document.getElementById("myLoader").classList.add("loader")
        }else{
            document.getElementById("myLoader").classList.remove("loader")
        }
        console.log(result);

        renderDatatoUi(result.data.recipes)

    } catch (error) {
        console.log("error", error);
    }
}


searchBtn.addEventListener("click", function () {
    // console.log("oke okoe");
    let value = searchFeild.value.trim();
    console.log(value);

    if (!value && value.length == 0) {
        alert("please write correct recpie name")
    } else {
        getfoodDataApi(value)
    }
})

async function showSingleItem(item) {

    
    SingleFood.innerHTML = `<div id="myLoaderBLack"></div> `
    document.getElementById("myLoaderBLack").classList.add("laoderTwo")

    console.log(item.id);
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${item.id}`);
    const result = await response.json()
    console.log(result);

    if (result){
        document.getElementById("myLoaderBLack").classList.remove("loaderTwo")

    }

    let { data } = result
    let { recipe } = data
    let { ingredients } = recipe
    // console.log(ingredients);

    let lis = ingredients.map(element => {
        return `<li>${element.description}</li>`
    })

    SingleFood.innerHTML = `
    <div id="myLoaderBLack"></div> 
    <div id="image" style="background-image:url(${result.data.recipe.image_url})">
        
    </div>
            <div id="foodTitle">
                <h1>${result.data.recipe.title}</h1>
            </div>
            <div id="foodDetails">
                <div>
                    <p><i class="fa-solid fa-clock"></i> : ${result.data.recipe.cooking_time} Minutes</p>
                    <p><i class="fa-solid fa-user-group"></i> ${result.data.recipe.servings} Servings</p>
                </div>
                <div>
                    <p>Save<i class="fa-solid fa-bookmark"></i></p>
                </div>
            </div>
            <div id="foodIngredients">
            <h2>Ingredients</h2>
                <ul>
                   ${lis.join("")}
                </ul >
            </div > `
}


getfoodDataApi("pizza")