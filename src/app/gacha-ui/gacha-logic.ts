

// Contains gaching logic and gachapon items

export class Gachapon {

    
    public gachaName: string;   //Gachapon's Name
    public gachaURL: string;    //Image URL
    public gachaList: string[]; //List of items contained in the gachapon
    public gachaPool: string[]; //Pool of n amount of items contained in gachapon, where "n" is relative to their drop rate
    public gachaText: string;   //Location of textfile


    //Temporary constructor until ".txt" conversion to array logic is moved
    constructor(gachaName:string , gachaURL: string, gachaList?:string[], gachaText?: string){
        this.gachaName = gachaName;
        this.gachaURL = gachaURL;
        this.gachaList = gachaList; //GachaList will eventually be generated while reading ".txt"
        this.gachaText = gachaText; 
    }

    
    // Read the gachaText file and as it's read, generate gachaList and gachaPool
    readTheFile(): void{
   


    }
    




}