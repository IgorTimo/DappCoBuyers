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
    
     const response = fetch(PORT + "/purchases", requestOptions);
     const data = await response.json();
     console.log(data.hash);
}