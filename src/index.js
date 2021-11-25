const bloomFilter = require('./bloomFilter');


bloomFilter.add('test');
bloomFilter.isExist('david');
bloomFilter.isExist('david1');
bloomFilter.isExist('david2');
bloomFilter.isExist('test');
bloomFilter.add('david');
bloomFilter.isExist('david');
bloomFilter.isExist('david1');
bloomFilter.isExist('david2');
