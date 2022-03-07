import PORT from "./PORT";

const createNewPurchaseHash = async (title, desc, supplierInfo) => {
    const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          title: title,
          desc: desc,
          supplierInfo: supplierInfo,
        }),
        headers: {
          "Content-type": "application/json",
        },
      };
    
     const response = await fetch(PORT + "purchases", requestOptions);
     const data = await response.json();
     return data.hash;
}

export default createNewPurchaseHash;