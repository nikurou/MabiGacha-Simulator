const router = require('express').Router();
const fs = require('fs');


function gachaLogic(fileName){
    let numGach;
    let totalNX, totalUSD;
    let gachPool = [];
    this.fileName = fileName;
    let generalList = [];

    this.readFile = function(){
        return new Promise(function (resolve, reject) {
            fs.readFile(fileName, (err, data) => { 
                if (err) {
                    () => reject(new Error(`Failed to read ${this.fileName}`));
                }else{ 
                    temp = data.toString().split(/%\t|\n/); 
                    for(let i = 0; i < temp.length;i+=2){
                        let numItem = temp[i] * 10;
                        generalList.push(temp[i]+'%');
                        //console.log(numItem);
                        let itemToAdd; 
                        if(i < temp.length-2){
                            itemToAdd = temp[i+1].substring(0,temp[i+1].length-1);
                        }else{
                            itemToAdd = temp[i+1];
                        }
                        generalList.push(itemToAdd);
                        //console.log(itemToAdd);
                        for(let j = 0; j < numItem;j++){
                            gachPool.push(itemToAdd);
                        }
                    }
                    resolve(gachPool);
                }
            }); 
        });
    }
    
    this.getList = function(){
        return generalList;
    }
    
    this.isInList = function(item){
        return gachPool.includes(item);
    }

    this.singleGach = function(itemName) {
        let response = [];
        console.log(gachPool.length);
        let counter = 0;
        let foundGacha = "";
        if(gachPool.includes(itemName)){
            while(!(foundGacha === itemName)){
                let random = Math.floor(Math.random() * gachPool.length);
                foundGacha = gachPool[random];
                counter++;
                response.push((counter) + ". Obtained [" + foundGacha.substring(0,foundGacha.length) + "]");
            }

            let NX = counter*1500;
            response.push("Found your item in " + counter +" tries and " + "spent a total of " + NX +" NX! or $" + (NX/1000) + " USD");
            numGach += counter;
            totalNX += NX;
            totalUSD += NX/1000;
        }else{
            response.push(`${itemName} is not a part of this gachapon!`);
        }
        return response;
    }

    this.bulkGach = function(amountGacha){
        let response = [];
        console.log(gachPool.length);
        for(let i = 0; i < amountGacha; i ++){
            let random = Math.floor(Math.random() * gachPool.length);
            let foundGacha = gachPool[random];
            response.push(i+1 + ". Obtained [" + foundGacha.substring(0,foundGacha.length) + "]");
        }
        let NX = amountGacha*1500;
        response.push("You spent " + (NX) +" NX on " + amountGacha + " gachas.");
        numGach+=amountGacha;
        totalNX += NX;
        totalUSD += NX/1000;
        return response;
    }

    this.printCurrentTotal = function(){ 
		let response = "Your current expenditure comes at $" + totalUSD + " USD or " + totalNX + " NX for a total of " + numGach + " gachapons.";
	}
}

router.route('/:gachaName/').get((req, res) => {
    let gacha;
    let promise; 
    switch(req.params.gachaName){
        case "Forest Ranger Bag Gachapon": 
            gacha = new gachaLogic("textfiles/Forest_Ranger_Bag_Gachapon.txt");
            promise = gacha.readFile();
            promise.then(() =>{
                return res.json(gacha.getList());
            }).catch(() =>{
                console.error(error);
            });
            break;
        case "Secret Garden Box": 
            gacha = new gachaLogic("textfiles/Secret_Garden_Box_Gachapon.txt");
            promise = gacha.readFile();
            promise.then(() =>{
                return res.json(gacha.getList());
            }).catch(() =>{
                console.error(error);
            });
            break;
        case "Crow Feather Box": 
            gacha = new gachaLogic("textfiles/Crow_Feather_Box_Gachapon.txt");
            promise = gacha.readFile();
            promise.then(() =>{
                return res.json(gacha.getList());
            }).catch(() =>{
                console.error(error);
            });
            break;
    }
});

router.route('/bulk/:gachaName/:number').get((req, res) => {
    let gacha;
    let promise; 
    switch(req.params.gachaName){
        case "Forest Ranger Bag Gachapon": 
            gacha = new gachaLogic("textfiles/Forest_Ranger_Bag_Gachapon.txt");
            promise = gacha.readFile();
            promise.then(() =>{
                return res.json(gacha.bulkGach(req.params.number));
            }).catch(() =>{
                console.error(error);
            });
            break;
        case "Secret Garden Box": 
            gacha = new gachaLogic("textfiles/Secret_Garden_Box_Gachapon.txt");
            promise = gacha.readFile();
            promise.then(() =>{
                return res.json(gacha.bulkGach(req.params.number));
            }).catch(() =>{
                console.error(error);
            });
            break;    
        case "Crow Feather Box": 
            gacha = new gachaLogic("textfiles/Crow_Feather_Box_Gachapon.txt");
            promise = gacha.readFile();
            promise.then(() =>{
                return res.json(gacha.bulkGach(req.params.number));
            }).catch(() =>{
                console.error(error);
            });
            break;
    }
});

router.route('/single/:gachaName/:itemName').get((req, res) => {
    let gacha;
    let promise; 
    switch(req.params.gachaName){
        case "Forest Ranger Bag Gachapon": 
            gacha = new gachaLogic("textfiles/Forest_Ranger_Bag_Gachapon.txt");
            promise = gacha.readFile();
            promise.then(() =>{
                return res.json(gacha.singleGach(req.params.itemName));
            }).catch(() =>{
                console.error(error);
            });
            break;
        case "Secret Garden Box": 
            gacha = new gachaLogic("textfiles/Secret_Garden_Box_Gachapon.txt");
            promise = gacha.readFile();
            promise.then(() =>{
                return res.json(gacha.singleGach(req.params.itemName));
            }).catch(() =>{
                console.error(error);
            });
            break;
        case "Crow Feather Box": 
            gacha = new gachaLogic("textfiles/Crow_Feather_Box_Gachapon.txt");
            promise = gacha.readFile();
            promise.then(() =>{
                return res.json(gacha.singleGach(req.params.itemName));
            }).catch(() =>{
                console.error(error);
            });
            break;            
    }
});

module.exports = router;