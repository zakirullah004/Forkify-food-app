let allRecipeis = "https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza"
let singleRecipe = " https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"

htmlfoodList = `<div id="foodList">
                <div id="foodImage">
                    <img src="https://png.pngtree.com/png-vector/20240930/ourmid/pngtree-spicy-chicken-biryani-png-image_13985451.png"
                        alt="foodimage">
                </div>
                <div id="foodInfo">
                    <h2 id="foodTitle">Biryani</h2>
                    <p style="margin-top: 1px;">matka biryani half kg</p>
                </div>
            </div>`;



async function renderDatatoUi(recipes) {
    // console.log(recipes);
    let foods = recipes.map((recipe) => {
        return `<div class="foodList" id=${recipe.id} onclick=showSingleItem(this)>
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
    foodMenu.innerHTML = foods.join();
}

async function getfoodDataApi(recipeName) {
    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeName}`)
        const result = await response.json();

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
    console.log(item.id);
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${item.id}`);
    const result = await response.json()
    console.log(result);

    let { data } = result
    let { recipe } = data
    let { ingredients } = recipe
    // console.log(ingredients);

    let lis = ingredients.map(element => {
        return `<li>${element.description}</li>`
    })
    // console.log(lis);
{/* <img src=${result.data.recipe.image_url  */}
// }>
    SingleFood.innerHTML = `
    <div id="image" style="background-image:url(${result.data.recipe.image_url})">
        
    </div>
            <div id="foodTitle">
                <h1>${result.data.recipe.title}</h1>
            </div>
            <div id="foodDetails">
                <div>
                    <p>time : ${result.data.recipe.cooking_time}</p>
                    <p>servings ${result.data.recipe.servings}</p>
                </div>
                <div>
                    <p>add</p>
                </div>
            </div>
            <div id="foodIngredients">
            <h2>Ingredients</h2>
                <ul>
                   ${lis.join("")}
                </ul >
            </div > `
}