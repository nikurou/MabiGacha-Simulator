const router = require('express').Router();
const fs = require('fs');
const { SignatureKind } = require('typescript');

function gachaLogic(fileName){
    let numGach;
    let totalNX, totalUSD;
    let gachPool = [];
    this.fileName = fileName;

    this.readFile = function(){
        return new Promise(function (resolve, reject) {
            fs.readFile(fileName, (err, data) => { 
                if (err) {
                    () => reject(new Error(`Failed to read ${this.fileName}`));
                }else{ 
                    temp = data.toString().split(/%\t|\n/); 
                    for(let i = 0; i < temp.length;i+=2){
                        let numItem = temp[i] * 10;
                        //console.log(numItem);
                        let itemToAdd = temp[i+1];
                        //console.log(itemToAdd);
                        for(let j = 0; j < numItem;j++){
                            gachPool.push(itemToAdd.substring(0,itemToAdd.length-1));
                        }
                    }
                    resolve(gachPool);
                }
                


            }); 
        });
    }
        
    this.isInList = function(item){
        return gachaPool.contains(item);
    }

    this.singleGach = function(itemName) {
        let response = [];
        console.log(gachPool.length);
        let counter = 0;
        let foundGacha = "";
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


router.route('/bulk/:gachaName/:number').get((req, res) => {
    let bulk;
    switch(req.params.gachaName){
        case "Forest Ranger Bag Gachapon": 
            bulk = new gachaLogic("textfiles/Forest_Ranger_Bag_Gachapon.txt");
            let promise = bulk.readFile();
            promise.then( 
                ()=>{
                    return res.json(bulk.bulkGach(req.params.number));
                },
                (err) => {throw err}
            );
            break;

    }
});

router.route('/single/:gachaName/:itemName').get((req, res) => {
    let single;
    switch(req.params.gachaName){
        case "Forest Ranger Bag Gachapon": 
            single = new gachaLogic("textfiles/Forest_Ranger_Bag_Gachapon.txt");
            let promise = single.readFile();
            promise.then( 
                ()=>{
                    return res.json(single.singleGach(req.params.itemName));
                },
                (err) => {throw err}
            );
            break;

    }
});

module.exports = router;