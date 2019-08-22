import React,{Component} from 'react';
import {instance,web3} from './eth/getInstance'
import CardExampleCard from './display/display'
class App extends Component{
    //状态变量用于传递数据
    state={
        manager:'',
        round:0,
        winner:'',
        allPlayers:[],
        balance:0,
        currentAccount:'',
    }
    //生命周期函数，在页面挂在的时候自动执行
    async componentDidMount(){
        //获取所有账户地址
        let accounts = await web3.eth.getAccounts();
        //获取当前账户地址
        let currentAccount = accounts[0];
        //管理员地址：manager
        let manager = await instance.methods.manager().call();
        //当前的期数：round
        let round = await instance.methods.round().call();
        //上一期中奖者地址：winner
        let winner = await instance.methods.winner().call();
        //玩家数组：players
        let allPlayers = await instance.methods.getPlayers().call();
        //合约里边的金额
        let balanceWei = await instance.methods.getBalance().call();
        //单位转换
        let balance = web3.utils.fromWei(balanceWei,'ether');
        //打印上述数据
        let detailInfo ={manager,round,winner,balance};
        console.table(detailInfo);
        //设置状态变量
        this.setState({manager,round,winner,allPlayers,balance,currentAccount});

    }
    //调用的函数
    play=async()=> {
        try{
            await instance.methods.play().send({
                from:this.state.currentAccount,
                value:(1*10)**18
            });
            alert('投注成功');
            window.location.reload(true);
        }catch{
            alert('投注失败');
            window.location.reload(true);
        }

    }
    draw=async()=>{
        try{
            await instance.methods.undraw().send({
                from:this.state.currentAccount,
            });
            //在这里重新设置中将着
            let winner = await instance.methods.winner().call();
            console.log('中奖地址：',winner);
            alert('开奖成功');
            window.location.reload(true);
        }catch{
            alert('开奖失败');
            window.location.reload(true);
        }
    }
    undraw=async()=>{
        try{
            await instance.methods.undraw().send({
                from:this.state.currentAccount,
            });
            alert('退奖成功');
            window.location.reload(true);
        }catch{
            alert('退奖失败');
            window.location.reload(true);
        }
    }
    render(){
        let {manager,round,winner,allPlayers,balance,currentAccount} = this.state
        return (

            <div className="App">
                <CardExampleCard
                    allData={this.state}
                    play={this.play}
                    draw={this.draw}
                    undraw={this.undraw}
                />
            </div>
        );
    }
}


export default App;
