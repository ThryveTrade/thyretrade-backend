import axios from "axios";
import chalk from "chalk";

export async function monitorOneMinuteBreakout() {
    console.log(chalk.blue("Starting real-time breakout monitor..."));

    let openRangeHigh = null;
    let openRangeLow = null;

    while (true) {
        try {
            const url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1";
            const res = await axios.get(url);
            const prices = res.data.prices;

            const recentCandles = prices.slice(-5).map(p => ({
                time: new Date(p[0]).toISOString(),
                price: p[1]
            }));

            const highs = recentCandles.map(c => c.price);
            const currentHigh = Math.max(...highs);
            const currentLow = Math.min(...highs);
            const latestPrice = recentCandles[recentCandles.length - 1].price;

            console.log(chalk.green(`${new Date().toISOString()} BTC Price: $${latestPrice}`));

            if (latestPrice > 110000) {
                console.log(chalk.bgGreen.black(`BUY SIGNAL BTC > 110000 (Current: $${latestPrice})`));
            } else if (latestPrice < 90000) {
                console.log(chalk.bgRed.white(`SELL SIGNAL BTC < 90000 (Current: $${latestPrice})`));
            }

            await new Promise(resolve => setTimeout(resolve, 60000));
        } catch (err) {
            console.error(chalk.red(`Error fetching price: ${err.message}`));
            await new Promise(resolve => setTimeout(resolve, 60000));
        }
    }
}
