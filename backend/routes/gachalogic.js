const router = require("express").Router();
const fs = require("fs");

function gachaLogic(files) {
  let numGach;
  let totalNX, totalUSD;
  let pools = [];
  this.fileName = files[0];
  let generalList = [];
  let listOfGachas = [];
  let promises = [];

  this.readFile = function () {
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < files.length; i++) {
        promises.push(
          new Promise(function (resolve, reject) {
            fs.readFile(files[i], (err, data) => {
              if (err) {
                console.error(err);
                reject(new Error(`Failed to read ${files[i]}`));
              } else {
                temp = data.toString().split(/%\t|\n/);
                console.log(temp);
                let gachPool = [];
                let specificList = [];
                for (let i = 0; i < temp.length; i += 2) {
                  let numItem = Number(temp[i]) * 100;
                  let rateToString = temp[i];

                  let itemToAdd;
                  if (i < temp.length - 2) {
                    //on heroku it doesnt read the empty space
                    itemToAdd = temp[i + 1].substring(0, temp[i + 1].length);
                    //on local it reads an extra space
                    //itemToAdd = temp[i+1].substring(0,temp[i+1].length-1);
                  } else {
                    itemToAdd = temp[i + 1];
                  }

                  if (numItem !== 0) {
                    generalList.push({
                      item: itemToAdd,
                      rate: rateToString,
                      numItem: numItem,
                    });
                  }

                  specificList.push(itemToAdd);
                  for (let j = 0; j < numItem; j++) {
                    gachPool.push(itemToAdd);
                  }
                }
                listOfGachas.push(specificList);
                resolve(pools.push(gachPool));
              }
            });
          })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {})
        );
      }

      Promise.all(promises)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  this.getListWithRates = function () {
    return generalList;
  };

  this.getList = function () {
    return listOfGachas.flat();
  };

  this.getPool = function () {
    return pools.flat();
  };

  /**
   * Logic to Open until a specific item is found
   *
   * @deprecated -  Logic has been implemented clientside, deprecated.
   */
  this.singleGach = function (itemName) {
    let response = [];
    let items = [];
    let counter = 0;
    let foundGacha = "";
    let selectedGacha = "";
    if (generalList.includes(itemName)) {
      let specificPool;
      for (let i = 0; i < listOfGachas.length; i++) {
        if (listOfGachas[i].includes(itemName)) {
          specificPool = i;
        }
      }
      while (!(selectedGacha === itemName)) {
        let random = Math.floor(Math.random() * pools[specificPool].length);
        foundGacha = pools[specificPool][random];
        selectedGacha = foundGacha;
        counter++;
        for (let i = 0; i < pools.length; i++) {
          if (i != specificPool) {
            let tempRandom = Math.floor(Math.random() * pools[i].length);
            let subGacha = ", " + pools[i][tempRandom];
            foundGacha += subGacha;
          }
        }
        response.push(counter + ". Obtained [" + foundGacha + "]");
        items.push(foundGacha);
      }

      let NX = counter * 1500;
      //response.push("Found your item in " + counter +" tries and " + "spent a total of " + NX +" NX! or $" + (NX/1000) + " USD");
      response.push("");
      numGach += counter;
      totalNX += NX;
      totalUSD += NX / 1000;
    } else {
      response.push(`${itemName} is not a part of this gachapon!`);
    }
    let total = [response, items];

    return total;
  };

  /**
   * Logic to Open a quantity of boxes serverside
   *
   * @deprecated -  Logic has been implemented clientside, deprecated.
   */
  this.bulkGach = function (amountGacha) {
    let response = [];
    let items = [];

    for (let i = 0; i < amountGacha; i++) {
      let foundGacha = "";
      for (let i = 0; i < pools.length; i++) {
        let random = Math.floor(Math.random() * pools[i].length);
        let subGacha = ", ";
        if (i == 0) {
          subGacha = "";
        }
        subGacha += pools[i][random];
        foundGacha += subGacha;
      }
      response.push(i + 1 + ". Obtained [" + foundGacha + "]");
      items.push(foundGacha);
    }

    let NX = amountGacha * 1500;
    //response.push("You spent " + (NX) +" NX on " + amountGacha + " gachas.");
    response.push("");
    numGach += amountGacha;
    totalNX += NX;
    totalUSD += NX / 1000;
    let total = [response, items];
    return total;
  };

  this.printCurrentTotal = function () {
    let response =
      "Your current expenditure comes at $" +
      totalUSD +
      " USD or " +
      totalNX +
      " NX for a total of " +
      numGach +
      " gachapons.";
  };
}

promiseSwitch = function (gachaName) {
  return new Promise(function (resolve, reject) {
    switch (gachaName) {
      case "BLEUGENNE by Bleugenne Cosmetics":
        resolve(
          new gachaLogic([
            "./backend/textfiles/BLEUGENNE_by_Bleugenne_Gachapon.txt",
          ])
        );
        break;
      case "Forest Ranger Bag Gachapon":
        resolve(
          new gachaLogic(["./backend/textfiles/Forest_Ranger_Bag_Gachapon.txt"])
        );
        break;
      case "Secret Garden Box":
        resolve(
          new gachaLogic(["./backend/textfiles/Secret_Garden_Box_Gachapon.txt"])
        );
        break;
      case "Crow Feather Box":
        resolve(
          new gachaLogic(["./backend/textfiles/Crow_Feather_Box_Gachapon.txt"])
        );
        break;
      case "Erinn Beauty Box":
        resolve(
          new gachaLogic([
            "./backend/textfiles/Erinn_Beauty_Box_Hair.txt",
            "./backend/textfiles/Erinn_Beauty_Box_EFM.txt",
            "./backend/textfiles/Erinn_Beauty_Box_Voucher.txt",
          ])
        );
        break;
      case "Modern School Uniform Box":
        resolve(
          new gachaLogic([
            "./backend/textfiles/Modern_School_Uniform_Box.txt",
            "./backend/textfiles/Modern_School_Uniform_Box_Bounty_Package.txt",
          ])
        );
        break;
    }
  });
};

// API RENDPOINTS
router.route("/:gachaName/").get((req, res) => {
  promiseSwitch(req.params.gachaName)
    .then((gacha) => {
      console.log("Gacha", gacha);
      gacha
        .readFile()
        .then(() => {
          let result = gacha.getList();
          return res.json(result);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
});

router.route("/pool/:gachaName/").get((req, res) => {
  promiseSwitch(req.params.gachaName)
    .then((gacha) => {
      console.log("Gacha", gacha);
      gacha
        .readFile()
        .then(() => {
          let result = gacha.getPool();
          return res.json(result);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
});

router.route("/object/:gachaName/").get((req, res) => {
  promiseSwitch(req.params.gachaName)
    .then((gacha) => {
      console.log("Gacha", gacha);
      gacha
        .readFile()
        .then(() => {
          let result = gacha.getListWithRates();
          return res.json(result);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
});

/* @deprecated */
// router.route("/bulk/:gachaName/:number").get((req, res) => {
//   promiseSwitch(req.params.gachaName)
//     .then((gacha) => {
//       gacha
//         .readFile()
//         .then(() => {
//           let result = gacha.bulkGach(req.params.number);
//           return res.json(result);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

/* @deprecated */
// router.route("/single/:gachaName/:itemName").get((req, res) => {
//   promiseSwitch(req.params.gachaName)
//     .then((gacha) => {
//       gacha
//         .readFile()
//         .then(() => {
//           let result = gacha.singleGach(req.params.itemName);
//           return res.json(result);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

module.exports = router;
