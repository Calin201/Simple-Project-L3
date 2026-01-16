const btcPriceText = document.getElementById("btcPrice");
const amountInput = document.getElementById("btcAmount");
const tableBody = document.getElementById("cryptoTable");

// Cryptocurrencies (CoinGecko IDs)
const cryptos = [
    { name: "Bitcoin", id: "bitcoin" },
    { name: "Ethereum", id: "ethereum" },
    { name: "BNB", id: "binancecoin" },
    { name: "Cardano", id: "cardano" },
    { name: "Solana", id: "solana" }
];

let cryptoPrices = {};

// Fetch prices from CoinGecko
async function fetchCryptoPrices() {
    try {
        const ids = cryptos.map(c => c.id).join(",");
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
        );
        const data = await response.json();

        cryptos.forEach(c => {
            cryptoPrices[c.id] = data[c.id]?.usd || 0;
        });

        btcPriceText.textContent = `BTC Price: ${cryptoPrices["bitcoin"].toFixed(2)} USD`;
        updateTable();
        console.log("✅ Prices fetched:", cryptoPrices);

    } catch (error) {
        console.error("❌ Error fetching prices:", error);
        btcPriceText.textContent = "Error loading BTC price";
    }
}

// Update the table when input changes
function updateTable() {
    const btcAmount = Number(amountInput.value) || 0;
    tableBody.innerHTML = "";

    cryptos.forEach(c => {
        const priceUSD = cryptoPrices[c.id] || 0;
        // each crypto has its own amount
        const amountInUSD = btcAmount * priceUSD;
        const row = document.createElement("tr");
        row.innerHTML = `<td>${c.name}</td><td>${amountInUSD.toFixed(2)} USD</td>`;
        tableBody.appendChild(row);
    });
}

// Live input event
amountInput.addEventListener("input", updateTable);

// Load prices on start
fetchCryptoPrices();
