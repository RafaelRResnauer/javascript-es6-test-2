/* SYMBOLS AND ITERATORS*/

const uniqueID = Symbol('Hello');

/*
Well known symbols:
    Symbol.iterator
    Symbol.split
    Symbol.toStringTag
*/

//iterator example
const arr = [1,2,3,4];
const str = 'Teste de String';

const it = arr[Symbol.iterator]();
while(true){
    let {value, done} = it.next();
    
    if(done){
        break;
    }

    console.log(value);
}

for(let value of str){
    console.log(value);
}

//Object iteration example
const obj = {
    values: [1,2,3,4],

    [Symbol.iterator](){
        let i = 0;
        return {
            next: () => {
                i++;
                return {
                    value: this.values[i-1],
                    done: i> this.values.length 
                };
            }
        };
    }
};

for(let value2 of obj){
    console.log(value2);
}

const arr2 = [...obj];
console.log(arr2);

/* GENERATORS */

const obj2 = {
    values: [1,2,3,4],

    *[Symbol.iterator](){
        for(var i=0;i<this.values.length;i++){
            yield this.values[i];
        }
    }
};

for(let value of obj2){
    console.log(value);
}