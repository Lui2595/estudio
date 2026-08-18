interface cacheElement {
    key : number,
    value : any,
    operation: number
}
class LRUCache {
    protected capacity : number
    protected cache : Array<cacheElement>
    protected operation : number
    constructor(capacity : number) {
        this.capacity = capacity;
        this.cache = []
        this.operation = 0;
    }

    /**
     * get
     */
    public get( key : number) : number {
        let index =  this.cache.findIndex( (cache) => cache.key === key);
        if (index === -1) {
            return index;
        }
        this.operation++;
        this.cache[index].operation = this.operation
        const result =this.cache[index].value;
        this.reorder();
        
        return result; 

    }

    /**
     * put
     */
    public put(key: number, value: number) : void {
        if (this.cache.length === this.capacity) {
            this.freeOldest();
            this.addCache(key,value);
        }else {
            this.addCache(key,value);
        }
    }
    private addCache (key: number, value: number) : void  {
        this.operation++;
        this.cache.push(
                {
                 key: key,
                 value:value,
                 operation:this.operation
                }
            )
        this.reorder()
    }
    private reorder () : void {
        this.cache = this.cache.sort((a,b)=> b.operation - a.operation )
    }
    private freeOldest () : void { 
        this.cache.pop();
    }


}

import fs from "fs";

interface Case {
    name : string,
    ops: Array<[string,...number[]]>,
    expected:Array<number>
}


function run() : void {
    const src = "starter/cases.json";
    const file = fs.readFileSync(src, "utf-8");
    const json = JSON.parse(file)

   json.cases.forEach((e: Case) : void => {
        let cache : LRUCache;
        let result : Array<number> = []
       e.ops.forEach( (e : [string, ...number[]], i : number) : void => {
            switch (e[0]) {
                case "LRUCache":
                   
                    cache = new LRUCache(e[1])
                    
                    break;
                case "put":
                    
                    cache.put(e[1],e[2])

                    break;
                case "get":
                    result.push(cache.get(e[1]))

                    break;
            }
       } )
       console.log(result)
   });
    
    
    console.log("Holas soy run");


}

run();