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

/* CALLBACKS AND PROMISES */

//Promise example
const doSomethingPromise = () => 
    new Promise((resolve, reject)=>{
        setTimeout(function (){
            //did something
            resolve("First data");
        }, 1000);  
    });

const doOtherThingPromise = () => 
    new Promise((resolve, reject)=>{
        setTimeout(function (){
            //did other thing
            resolve("Second data");
        }, 1500);
    });
/* Asynchronous
doSomethingPromise()
    .then(data3 => {
        console.log(data3.split('')); 
        return doOtherThingPromise();
    })
    .then(data3 => console.log(data3.split('')));
*/

Promise.all([doSomethingPromise(), doOtherThingPromise()]).then(data4 => {
    console.log(data4);
});
//Pending
//Fulfilled
//Rejected


//Callback example
function doSomething(callback){
    setTimeout(function (){
        //did something
        callback("First data");
    },1000);
}

function doOtherThing(callback){
    setTimeout(function (){
        //did other thing
        callback("Second data");
    },1000);
}

//No promises
function doAll(){
    try{
        doSomething(function(data){
            var processedData = data.split('');
            try{
                doOtherThing(function(data2){
                    var processedData2 = data2.split('');
                    try{
                        setTimeout(function(){
                            console.log(processedData,processedData2);
                        },1000);
                    }catch(err){
                        //handle error
                    }    
                });
            }catch(err){
                //handle error
            }
    });
    }catch(err){
        //handle error
    }
}
doAll();
