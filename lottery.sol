pragma solidity ^0.4.24;

contract Lottery{
    //管理员地址
    address public manager;
    //所有彩民
    address[] public players;
    //彩票期数
    uint public round;
    //上一期中奖地址
    address public winner;
    //添加管理员地址
    constructor() public{
        manager=msg.sender;
    }

    //参与投奖
    function play() public payable{
        //要求调用时转入
        require(msg.value==1 * 10 ** 18);
        players.push(msg.sender);
    }
    //管理员开奖
    function draw() public onlyManager{
        //以太坊中没有提供随机数生成方法，可以随机生成一个哈希数，并将它对数组长度取余
        //取当前的难度值，时间戳和彩民人数作为随机数的种子
        bytes memory info = abi.encodePacked(block.difficulty,block.timestamp,players.length);
        bytes32 hash = keccak256(info);
        uint index = uint(hash)%players.length;
        winner = players[index];
        winner.transfer(address(this).balance);
        //彩民池清空同时期数加1
        delete players;
        round++;
    }

    //管理员退奖
    function undraw() public onlyManager{
        //遍历彩民数组，依次向彩民转账
        for(uint256 i=0;i<players.length;i++){
            players[i].transfer(1 ether);
        }
        delete players;
        round++;
    }
    /*******************辅助函数*************************/
    //获取奖金池额度
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
    //获取当前彩民
    function getPlayers() public view returns(address[]){
        return players;
    }
    //添加修饰器
    modifier onlyManager(){
        require(msg.sender==manager);
        _;
    }
}