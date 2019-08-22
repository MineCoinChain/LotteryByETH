let {bytecode,interface}=require('./compile');
//初始化web3
let Web3 = require('web3');
let web3 = new Web3('http://127.0.0.1:7545');
let deploy = async() =>{
    //获取当前所有可用地址
    let accounts = await web3.eth.getAccounts();
    console.log("当前测试网络的所有地址为:",accounts);
    //填写API
    let contract = new web3.eth.Contract(JSON.parse(interface));
    //填写bytecode和构造函数
    contract.deploy({
        data:bytecode,
    }).send({
        from:accounts[0],
        value:0,
        gas:'800000',
    }).then(res=>{
        console.log('部署合约的地址为:',res.options.address);
    }).catch(err=>{
        console.log('部署合约失败:',err);
    });

}

deploy();
