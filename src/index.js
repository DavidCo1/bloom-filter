const bloomFilter = require('./bloomFilter');


bloomFilter.add('test');
let result = bloomFilter.isExist('david');
result = bloomFilter.isExist('test');