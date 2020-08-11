
const fs = require('fs');

function Gachapon(fileName){
    let numGach;
    let totalNX, totalUSD;
    let gachPool = [];
    this.fileName = fileName;

    fs.readFile(fileName, (err, data) => { 
        if (err) throw err; 
        
        temp = data.toString().split(/%\t|\n/); 
        for(let i = 0; i < temp.length;i+=2){
            let numItem = temp[i] * 10;
            console.log(numItem);
            let itemToAdd = temp[i+1];
            console.log(itemToAdd);
            for(let j = 0; j < numItem;j++){
                gachPool.push(itemToAdd.substring(0,itemToAdd.length-1));
            }
        }
        console.log(gachPool.length);

    }); 

    function isInList(item){
        return gachaPool.contains(item);
    }

    function searchTheGach(itemName) {
        let counter = 0;
        let foundGacha = "";
        while(!(foundGacha === itemName)){
            let random = Math.floor(Math.random() * gachPool.length);
            foundGacha = gachaPool[random];
            counter++;
            console.log((counter) + ". Obtained [" + foundGacha.substring(0,foundGacha.length()) + "]");
        }

        let NX = counter*1500;
		console.log("Found your item in " + counter +" tries and " + "spent a total of " + NX +" NX! or $" + (NX/1000) + " USD");
		numGach += counter;
		totalNX += NX;
		totalUSD += NX/1000;
    }

    function bulkGach(amountGacha){
        for(let i = 0; i < amountGacha; i ++){
            let random = Math.floor(Math.random() * this.gachPool.length);
            let foundGacha = gachaPool.get(random);
            console.log((counter) + ". Obtained [" + foundGacha.substring(0,foundGacha.length()) + "]");
        }
        let NX = amountGacha*1500;
        console.log("\nYou spent " + (NX) +" NX on " + amountGacha + " gachas.");
        numGach+=amountGacha;
        totalNX += NX;
		totalUSD += NX/1000;
    }

    function printCurrentTotal(){ 
		console.log("Your current expenditure comes at $" + totalUSD + " USD or " + totalNX + " NX for a total of " + numGach + " gachapons.");
	}
}

Gachapon("Forest_Ranger_Bag_Gachapon.txt");