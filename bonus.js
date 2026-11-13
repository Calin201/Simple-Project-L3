async function getRandomCat() {
    const result = document.getElementById("cat-result");
    result.className = "result-box loading";
    result.textContent = "Loading a cat photo...";

    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        if (!response.ok) {
            throw new Error("The cat image service is temporarily unavailable. Please try again.");
        }

        const cats = await response.json();
        const imageUrl = new URL(cats[0]?.url);
        if (imageUrl.protocol !== "https:" || !imageUrl.hostname.endsWith(".thecatapi.com")) {
            throw new Error("The cat image service returned an invalid response.");
        }

        const image = document.createElement("img");
        image.className = "cat-image";
        image.src = imageUrl.href;
        image.alt = "Random cat";
        image.addEventListener("error", () => {
            result.className = "result-box error";
            result.textContent = "The cat photo could not be loaded. Please try again.";
        }, { once: true });

        result.className = "result-box";
        result.replaceChildren(image);
    } catch (error) {
        result.className = "result-box error";
        result.textContent = error.message || "Unable to load a cat photo. Please try again.";
    }
}

async function getRandomDog() {
    const result = document.getElementById("dog-result");
    result.className = "result-box loading";
    result.textContent = "Loading a dog photo...";

    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        if (!response.ok) {
            throw new Error("The dog image service is temporarily unavailable. Please try again.");
        }

        const data = await response.json();
        const imageUrl = new URL(data.message);
        if (data.status !== "success" || imageUrl.protocol !== "https:" || imageUrl.hostname !== "images.dog.ceo") {
            throw new Error("The dog image service returned an invalid response.");
        }

        const image = document.createElement("img");
        image.className = "dog-image";
        image.src = imageUrl.href;
        image.alt = "Random dog";
        image.addEventListener("error", () => {
            result.className = "result-box error";
            result.textContent = "The dog photo could not be loaded. Please try again.";
        }, { once: true });

        result.className = "result-box";
        result.replaceChildren(image);
    } catch (error) {
        result.className = "result-box error";
        result.textContent = error.message || "Unable to load a dog photo. Please try again.";
    }
}