console.log('start')

setTimeout(function(){
    console.log('your meal is ready.')
}, 3000);

console.log('end')

//비동기적인 실행이 이루어졌다.
//start -> end -> your meal is ready.