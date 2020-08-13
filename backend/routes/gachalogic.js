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

                        let itemToAdd; 
                        if(i < temp.length-2){
                            itemToAdd = temp[i+1].substring(0,temp[i+1].length-1);
                        }else{
                            itemToAdd = temp[i+1];
                        }
                        generalList.push(itemToAdd);

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
        let items = [];
        let counter = 0;
        let foundGacha = "";

        if(gachPool.includes(itemName)){
            while(!(foundGacha === itemName)){
                let random = Math.floor(Math.random() * gachPool.length);
                foundGacha = gachPool[random];
                counter++;
                response.push((counter) + ". Obtained [" + foundGacha.substring(0,foundGacha.length) + "]");
                items.push(foundGacha.substring(0,foundGacha.length));
            }

            let NX = counter*1500;
            response.push("Found your item in " + counter +" tries and " + "spent a total of " + NX +" NX! or $" + (NX/1000) + " USD");
            numGach += counter;
            totalNX += NX;
            totalUSD += NX/1000;
        }else{
            response.push(`${itemName} is not a part of this gachapon!`);
        }
        let total = [response, items];

        return total;
    }

    this.bulkGach = function(amountGacha){
        let response = [];
        let items = [];

        for(let i = 0; i < amountGacha; i ++){
            let random = Math.floor(Math.random() * gachPool.length);
            let foundGacha = gachPool[random];
            response.push(i+1 + ". Obtained [" + foundGacha.substring(0,foundGacha.length) + "]");
            items.push(foundGacha.substring(0,foundGacha.length));
        }

        let NX = amountGacha*1500;
        response.push("You spent " + (NX) +" NX on " + amountGacha + " gachas.");
        numGach+=amountGacha;
        totalNX += NX;
        totalUSD += NX/1000;
        let total = [response, items];
        console.log(total);
        return total;
    }

    this.printCurrentTotal = function(){ 
		let response = "Your current expenditure comes at $" + totalUSD + " USD or " + totalNX + " NX for a total of " + numGach + " gachapons.";
	}
}

promiseSwitch = function(gachaName){
    return new Promise(function (resolve, reject) {
        switch(gachaName){
            case "Forest Ranger Bag Gachapon": 
                resolve(new gachaLogic("textfiles/Forest_Ranger_Bag_Gachapon.txt"));
                break;
            case "Secret Garden Box": 
                resolve(new gachaLogic("textfiles/Secret_Garden_Box_Gachapon.txt"));
                break;
            case "Crow Feather Box": 
                resolve(new gachaLogic("textfiles/Crow_Feather_Box_Gachapon.txt"));
                break;
        } 
    });
}

router.route('/:gachaName/').get((req, res) => {
    promiseSwitch(req.params.gachaName).then((gacha)=>{
        gacha.readFile().then(() =>{
            return res.json(gacha.getList());
        }).catch((error) =>{
            console.error(error);
        });
    }).catch((error) =>{
        console.error(error);
    });
});

router.route('/bulk/:gachaName/:number').get((req, res) => {
    promiseSwitch(req.params.gachaName).then((gacha)=>{
        gacha.readFile().then(() =>{
            let result = gacha.bulkGach(req.params.number);
            return res.json(result);
        }).catch((error) =>{
            console.error(error);
        });
    }).catch((error) =>{
        console.error(error);
    });
});

router.route('/single/:gachaName/:itemName').get((req, res) => {
    promiseSwitch(req.params.gachaName).then((gacha)=>{
        gacha.readFile().then(() =>{
            let result = gacha.singleGach(req.params.itemName);
            return res.json(result);
        }).catch((error) =>{
            console.error(error);
        });
    }).catch((error) =>{
        console.error(error);
    });
});

module.exports = router;