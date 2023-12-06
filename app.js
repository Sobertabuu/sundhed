updateFoodList()
updateTotalCalories()

function validateForm(event) {
    event.preventDefault();

    const foodName = document.forms[0][0].value;
    const calories = document.forms[0][1].value;

    if (!foodName || !calories) {
        alert("Indlæs mad navn og kalorier.");
        return;
    }

    let foods = [];
    const existingCookies = document.cookie.split(';');
    for (let i = 0; i < existingCookies.length; i++) {
        const cookie = existingCookies[i].trim();
        if (cookie.startsWith("foods=")) {
            foods = JSON.parse(cookie.substring("foods=".length));
            break;
        }
    }

    foods.push({ foodName, calories });

    document.cookie = `foods=${JSON.stringify(foods)}`;

    console.log("Mad tilføjet:", { foodName, calories });

    updateFoodList();
    updateTotalCalories()
}

function updateFoodList() {
    const foodListDiv = document.getElementById("foodList");
    foodListDiv.innerHTML = ""; // Clear existing content

    let foods = [];
    const existingCookies = document.cookie.split(';');
    for (let i = 0; i < existingCookies.length; i++) {
        const cookie = existingCookies[i].trim();
        if (cookie.startsWith("foods=")) {
            foods = JSON.parse(cookie.substring("foods=".length));
            break;
        }
    }

    foods.forEach(food => {
        const foodEntry = document.createElement("p");
        foodEntry.textContent = `Mad: ${food.foodName}, Kalorier: ${food.calories}`;
        foodListDiv.appendChild(foodEntry);
    });
}

function resetCookies() {
    document.cookie = "foods=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    const foodListDiv = document.getElementById("foodList");
    foodListDiv.innerHTML = "";
}

function validateNumericInput(input) {
    input.value = input.value.replace(/\D/g, '');
}

function updateTotalCalories() {
    let totalCalories = 0;

    let foods = [];
    const existingCookies = document.cookie.split(';');
    for (let i = 0; i < existingCookies.length; i++) {
        const cookie = existingCookies[i].trim();
        if (cookie.startsWith("foods=")) {
            foods = JSON.parse(cookie.substring("foods=".length));
            break;
        }
    }

    foods.forEach(food => {
        totalCalories += parseInt(food.calories, 10) || 0;
    });

    const totalCaloriesDiv = document.getElementById("totalCalories");
    totalCaloriesDiv.textContent = `Anbefalede Kalorier: ${totalCalories}/2500`;
}