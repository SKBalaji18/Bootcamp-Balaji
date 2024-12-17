const nums = process.argv.slice(2)

if (nums.length === 0) {
    console.error("Please provide numbers as arguments.");
    process.exit(1);
}

let sum = 0 

try{
    nums.forEach(each => {
        let num = parseFloat(each)
        if (isNaN(each)){
            throw new Error(`Invalid number: ${each}`);
        }
        sum+=num
    });
    console.log(`Sum is ${sum}`)
}catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}

