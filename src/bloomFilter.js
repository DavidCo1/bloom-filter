murmurhash = require('murmurhash');

let bloomArray;
const arraySize = 200;
const numOfHash = 3;

function init() {
    console.log('init bloom filter');
    bloomArray = new Array(arraySize).fill(false);
}



function add(value) {
    for (let index = 1; index <= numOfHash; index++) {
        const result = murmurhash.v3(value, index) % arraySize;
        console.log(`adding "${value}", iteration ${index}. result: ${result}`);
        bloomArray[result] = true;
    }
}


function isExist(value) {
    for (let index = 1; index <= numOfHash; index++) {
        const result = murmurhash.v3(value, index) % arraySize;
        console.log(`looking for "${value}", iteration ${index}. result: ${result}`);
        if (bloomArray[result] === false) {
            console.log(`"${value}" not found`);
            return false;
        }
    }

    console.log(`"${value}" probably exist`);
    return true;
}

init();

module.exports = {
    add: add,
    isExist: isExist
}