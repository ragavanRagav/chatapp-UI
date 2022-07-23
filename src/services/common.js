const time=(timestamp)=>{
    const d = timestamp ? new Date(timestamp) : new Date();
    return d.getTime();
}

const timeandDate=(timestamp)=>{
    try{
        const d = timestamp ? new Date(Number(timestamp)) : new Date();
        return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}(${d.getHours()}:${d.getMinutes()})`;
    }catch(err){
        console.log(err);
        return (new Date()).getDate();
    }
}


export {time,timeandDate}