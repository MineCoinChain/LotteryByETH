import React from 'react'
import { Card, Icon, Image, Statistic } from 'semantic-ui-react'

const CardExampleCard = (props) => {
    let allData = props.allData;
    let{manager,round,winner,allPlayers,balance,currentAccount}=allData;
    let play = props.play;
    let draw = props.draw;
    let undraw = props.undraw;
    return(
    <Card>
        <Image src='/logo.jpg' wrapped ui={false} />
        <Card.Content>
            <Card.Header>皇家彩票</Card.Header>
            <Card.Meta>开奖员地址:</Card.Meta>
            <p>{manager}</p>
            <Card.Meta>当前地址:</Card.Meta>
            <p>{currentAccount}</p>
            <Card.Meta>上一期中奖地址:</Card.Meta>
            <p>{winner}</p>
            <Card.Description>全天24小时在线,每周一、周二、周六晚八点开奖</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user' />
                {allPlayers.length}人
            </a>
        </Card.Content>
        <Card.Content extra>
            <Statistic color="red">
                <Statistic.Value>{balance} ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>
        </Card.Content>
        <Card.Content extra>
            <Statistic color="blue">
                <Statistic.Value>第{round} 期</Statistic.Value>
                <Statistic.Label>期数</Statistic.Label>
                <a>点击我查看交易历史</a>
            </Statistic>
        </Card.Content>
        <Button inverted color="orange" onClick={play}>
            投注
        </Button>
        <Button inverted color="yellow" onClick={draw}>
            开奖
        </Button>
        <Button inverted color="olive" onClick={undraw}>
            退奖
        </Button>
    </Card>
);}

export default CardExampleCard