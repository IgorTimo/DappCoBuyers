//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract PurchaseFactory {
    address[] public deployedPurchases;

    function createStoragePurchase(address _supplier, uint _priceForOneItem, uint _minItems, uint _fundraisingTime, string memory _title, string memory _desc) public {
        address newPurchase = address(new StoragePurchase(msg.sender, _supplier, _priceForOneItem, _minItems, _fundraisingTime, _title, _desc));
        deployedPurchases.push(newPurchase);
    }
    //0xdD870fA1b7C4700F2BD7f44238821C26f7392148, 1000, 2,  180, "new puchase", "very important staff"

    function createHashPurchase(address _supplier, uint _priceForOneItem, uint _minItems, uint _fundraisingTime , bytes32 _hashOfAllPurchaseInfo) public {
        address newPurchase = address(new HashPurchase(msg.sender, _supplier, _priceForOneItem, _minItems, _fundraisingTime,  _hashOfAllPurchaseInfo));
        deployedPurchases.push(newPurchase);
    }
    // 0xdD870fA1b7C4700F2BD7f44238821C26f7392148, 1000, 1,  120, 0x00e8524011f8156f884aabec3d87ecdd69f75c386b8d814b26b1ac9da191bc3f

    function getDeployedPurchases() public view returns(address[] memory){
        return deployedPurchases;
    }

}

 abstract contract Purchase {
    address public manager;//создатель закупки
    address public supplier;//поставщик закупки
    uint public priceForOneItem;//цена за один товар в закупке
    uint public minItems;//минимальное коллчиство, которое нужно для успешной закупки
    uint32 public endOfFundraising;//максимальное веремя до когда деньги на закупку должны быть собраны
    mapping(address => uint32) public cutomersToItems;//кол-во товаров для каждого адреса-участника
    uint public totalItemsCount;//кол-во товаров, которые уже предзаказали
    bool public isFinished;//окончена ли закупка

    struct PurchaseInfo{//структура с информацией о закупке
        address manager;
        address supplier;
        uint priceForOneItem;
        uint minItems;
        uint32 endOfFundraising;
        uint totalItemsCount;
        bool isFinished;
        bytes32 hashOfAllPurchaseInfo;
        string  title;
        string  desc;
    }

    constructor(address _manager, address _supplier, uint _priceForOneItem, uint _minItems, uint _fundraisingTime){
        manager = _manager;
        supplier = _supplier;
        priceForOneItem = _priceForOneItem;
        minItems = _minItems;
        endOfFundraising = uint32(block.timestamp + _fundraisingTime);
    }

    modifier purchaseOver{
        require(cutomersToItems[msg.sender] > 0, "You are not a customer in this contract!");//проверяем покупатель ли это
        require(block.timestamp > endOfFundraising, "Fundraising time is not over!");//проверяем закончилось ли время компании по сбору
        _; 
    }

    modifier enoughMoney {
        require(totalItemsCount >= minItems, "Not enough money");//проверяем добрали ли мы минимальное кол-во для закупки
        _;
    }

    function payToSupplier() private {
        payable(supplier).transfer(address(this).balance);//переводим деньги поставщику
        isFinished = true;//закрываем закупку
    }
     
    function participate(uint32 _itemsCount) public payable{//становимся кобаером
        require(!isFinished, "This purchase is over!");//проверяем активна ли закупка.
        uint total = priceForOneItem * _itemsCount; //считаем общую сумму
        require(total <= msg.value, "Too littel money!");//проверяем хватает ли денег
        cutomersToItems[msg.sender] = _itemsCount;//запись в мэппинг
        totalItemsCount += _itemsCount;//увелечение общего счётчика
    }

    function makePurchase() public enoughMoney {//закупка производимая менеджером
        require(manager == msg.sender, "You are not a manager");
        payToSupplier();
    }

    function makePurchaseByCustomer() public purchaseOver enoughMoney {//закупка производимая любым покупателем в случае если менеджер пропал, а деньги собрались и время сбора окончено
        payToSupplier(); 
    }

    function refund() public purchaseOver { //запрос на возврат денег, если закупка не собрала минмальную сумму
        require(totalItemsCount < minItems, "This purchase was successful, you cannot make a refund!");//проверяем успешна ли закупка. Вернуть деньги можно только если нет.
        uint sum = cutomersToItems[msg.sender] * priceForOneItem; //сумма к возврату
        payable(msg.sender).transfer(sum);//возвращаем деньги
    }

    function getParentInfo() public view returns (
        address,
        address,
        uint,
        uint,
        uint32,
        uint,
        bool
    ) {
        return (
            manager,
            supplier,
            priceForOneItem,
            minItems,
            endOfFundraising,
            totalItemsCount,
            isFinished
        );
    }

    function getInfo() public view virtual returns (PurchaseInfo memory);
}

contract StoragePurchase is Purchase { //вариант контракта, когда всё хранится в блокчейне
    string public title;
    string public desc;

    //0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 0xdD870fA1b7C4700F2BD7f44238821C26f7392148, 1000, 1,  3600, "new puchase", "very important staff"

    constructor(
        address _manager, 
        address _supplier, 
        uint _priceForOneItem, 
        uint _minItems, 
        uint _fundraisingTime, 
        string memory _title, 
        string memory _desc) 
        Purchase(_manager, _supplier, _priceForOneItem, _minItems, _fundraisingTime){
        title = _title;
        desc = _desc;
    }

    function getInfo() public view override returns (PurchaseInfo memory){
        (address manager, 
        address supplier, 
        uint priceForOneItem, 
        uint minItems, 
        uint32 endOfFundraising, 
        uint totalItemsCount, 
        bool isFinished) = super.getParentInfo();
        PurchaseInfo memory purchaseInfo = PurchaseInfo({
            manager: manager,
            supplier: supplier, 
            priceForOneItem: priceForOneItem,
            minItems: minItems,
            endOfFundraising: endOfFundraising,
            totalItemsCount: totalItemsCount,
            isFinished: isFinished,
            hashOfAllPurchaseInfo: 0,
            title: title,
            desc: desc
        });
        return (purchaseInfo);
    }

}

contract HashPurchase is Purchase { //вариант контракта, когда только хэш инфы хранится в блокчейне, а остальное на сервере
    bytes32 public hashOfAllPurchaseInfo;

    //0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 0xdD870fA1b7C4700F2BD7f44238821C26f7392148, 1000, 1,  3600, 0x00e8524011f8156f884aabec3d87ecdd69f75c386b8d814b26b1ac9da191bc3f

    
    constructor(
        address _manager, 
        address _supplier, 
        uint _priceForOneItem, 
        uint _minItems,
        uint _fundraisingTime, 
        bytes32 _hashOfAllPurchaseInfo) 
        Purchase(_manager, _supplier, _priceForOneItem, _minItems, _fundraisingTime){
        hashOfAllPurchaseInfo = _hashOfAllPurchaseInfo;
    }

    function getInfo() public view override returns (PurchaseInfo memory){
        (address manager, 
        address supplier, 
        uint priceForOneItem, 
        uint minItems, 
        uint32 endOfFundraising, 
        uint totalItemsCount, 
        bool isFinished) = super.getParentInfo();
        PurchaseInfo memory purchaseInfo = PurchaseInfo({
            manager: manager,
            supplier: supplier, 
            priceForOneItem: priceForOneItem,
            minItems: minItems,
            endOfFundraising: endOfFundraising,
            totalItemsCount: totalItemsCount,
            isFinished: isFinished,
            hashOfAllPurchaseInfo: hashOfAllPurchaseInfo,
            title: "",
            desc: ""
        });
        return (purchaseInfo);
    }

}