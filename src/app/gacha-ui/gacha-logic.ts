
// Contains gaching logic and gachapon items

import { RouteConfigLoadEnd } from '@angular/router';
import axios from 'axios';

declare const gachaLogic:any;

export class Gachapon{
    public gachaName: string;   //Gachapon's Name
    public gachaURL: string;    //Image URL
   
    public gachaList: string[]; //List of items contained in the gachapon
   
    //Temporary constructor until ".txt" conversion to array logic is moved
    constructor(gachaName:string , gachaURL: string){
        this.gachaName = gachaName;
        this.gachaURL = gachaURL;

        this.gachaList = [];
        
        axios.get(`http://localhost:5000/gacha/${gachaName}`)
        .then(res => {
            for(let i = 1; i < res.data.length;i+=2){
                this.gachaList.push(res.data[i]);
            }
        });
    }
    

}