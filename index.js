const searchFood=()=>{
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    document.getElementById('spinner').style.display='block';
    searchField.value='';
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySearchResult(data.meals));
}

const displaySearchResult= meals =>{
    console.log(meals);
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML='';
    if(meals==null)
     {
        searchResult.innerHTML="<h1>No Result Found</h1>" ; 
     }
    meals.forEach(meal =>{
        /* console.log(meal); */
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
            <div onclick="loadMealDetail(${meal.idMeal})" class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0,200)}</p>         
            </div>
        `;
        searchResult.appendChild(div);
    })
    document.getElementById('spinner').style.display='none';
}

const loadMealDetail=async mealId=>{
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    const res =await fetch(url);
    const data=await res.json();
    displayMealDetail(data.meals[0]);
    
    /* fetch(url)
    .then(res  => res.json())
    .then(data => {displayMealDetail(data.meals[0])}); */
}

const displayMealDetail = meal =>{
    console.log(meal);
    const mealDetails=document.getElementById('meal-details');
    console.log(mealDetails);
    mealDetails.innerHTML=
    `<div class="card mx-auto mb-3" style="width: 18rem;">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">See Video</a>
        </div>
    </div>`;
}