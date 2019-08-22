let fs = require('fs');
let solc = require('solc');
//指定utf8，返回一个string字符串，那么下边编译的时候就不需要toString()方法，如果不自定义utf8，返回的是Buffer，那么contractInfo需要指定tostring
let contractInfo = fs.readFileSync('./lottery.sol','utf-8');
let compileInfo = solc.compile(contractInfo);
//JSON.parse(字符串)-->转换成一个JSON对象
//JSON.stringfly(JSON对象)-->转换成一个JSON字符串
let res = fs.writeFileSync('./compileInfo.json',JSON.stringify(compileInfo),'utf-8');
module.exports = compileInfo['contracts'][':Lottery'];
