import PORT from "./PORT"

const getPurchaseByHash = async (hash) => {
    hash = hash.substring(2);
    const response = await fetch(`${PORT}purchases/${hash}`);
    const data = await response.json();
    if(data.info){
        const {title, desc, supplierInfo} = data.info;
        return {title, desc, supplierInfo};
    }else{
        console.log("Error: ", data.error);
    }
}

export default getPurchaseByHash;