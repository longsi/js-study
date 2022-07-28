function promisify(original){
    function fn(...args){
        return new Promise((resolve,reject)=>{
            // promisify最终执行的其实还是原先的函数，只是换了一种思路（我的理解）
            // 而原先的回调函数，在执行完主体逻辑之后就会执行回调，而promisify 做的事情是在fn 的参数中增加了一个回调，
            // 这样在执行回调的时候就相当于执行了then 函数里面的内容
            args.push((err,...values)=>{
                if(err){
                    return reject(err);
                }
                resolve(values);
            });
            // original.apply(this,args);
            Reflect.apply(original,this,args);
        })
    };

    return fn ;
}