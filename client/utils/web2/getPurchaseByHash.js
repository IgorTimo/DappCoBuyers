import PORT from "./PORT"

const getPurchaseByHash = async (hash) => {
    const response = await fetch(`${PORT}purchases/${hash}`);
    const data = await response.json();
    console.log("Info: ", data.info);
}

export default getPurchaseByHash;