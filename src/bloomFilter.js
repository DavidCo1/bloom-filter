const murmurhash = require('murmurhash');

let bloomArray;
const arraySize = 200;
const numOfHash = 3;
let valuesCount = 0;

function _init() {
    console.log('init bloom filter');
    bloomArray = new Array(arraySize).fill(false);
}

function _getFalsePositiveRate() {
    const n = valuesCount;
    const m = arraySize;
    const k = numOfHash;
    const rate = Math.pow(1 - Math.exp(-k / (m / n)), k);
    return (Math.round(((rate * 100) + Number.EPSILON) * 100) / 100);
}


function add(value) {
    for (let index = 1; index <= numOfHash; index++) {
        const result = murmurhash.v3(value, index) % arraySize;
        console.log(`adding "${value}", iteration ${index}. result: ${result}`);
        bloomArray[result] = true;
    }

    console.log(`"${value}" added. total values count is ${++valuesCount}. current false positive rate: ${_getFalsePositiveRate()}`);
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

    console.log(`"${value}" probably exist. current false positive rate: ${_getFalsePositiveRate()}`);
    return true;
}

_init();

module.exports = {
    add: add,
    isExist: isExist
}