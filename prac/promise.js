const addSum = (a,b) => new Promise((resolve,reject) =>{
    setTimeout(() => {
        if (typeof a !== 'number' || typeof b !== 'number') {
            reject('a,b must be numbers.');
        }
        resolve(a + b)
    }, 2000);
})

// addSum(10,4)
// .then(sum=> {addSum(sum, 3)})
// .then(sum2=> console.log({sum2}))
// .catch(error=> console.log({error}))


const totalSum = async () => {
    try{
        let sum = await addSum(10,10)
        let sum2 = await addSum(20,4)
        console.log({sum, sum2})
    } catch(err){
        if(err) console.log({err})
    }
   
}

totalSum()