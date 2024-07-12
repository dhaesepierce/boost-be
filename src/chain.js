const abi = [{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"address","name":"admin_","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"admin_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"implementation_","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const {Web3} = require('web3');
const web3 = new Web3('https://polygon-mainnet.infura.io/v3/71774851c84a406ca72d1452f55e10d2');
const contractAddress = '0x52629961F71C1C2564C5aa22372CB1b9fa9EBA3E'
const eventHash = '0xc40dcf949d674b2920d8f7cc045e01d207becd5f362fbed0eef71088634722bd'
let contract = new web3.eth.Contract(abi,contractAddress)
const params = [
    {name:'creator',type:'address',indexed:true},
    {name:'contractAddress',type:'address',indexed:true},
    {name:'projectName',type:'string'},
    {name:'questName',type:'string'},
    {name:'questId',type:'string'},
    {name:'questType',type:'string'},
    {name:'actionType',type:'string'},
    {name:'chainId',type:'uint32'},
    {name:'rewardToken',type:'address'},
    {name:'endTime',type:'uint256'},
    {name:'startTime',type:'uint256'},
    {name:'totalParticipants',type:'uint256'},
    {name:'rewardAmountOrTokenId',type:'uint256'}
]
const PAST_EVENT = async (start,end) => {
    res = []
    const events = await contract.getPastEvents('allEvents',{fromBlock:start,toBlock:end})
    for (let i = 0; i < events.length; i++){
        if(events[i].topics[0]== eventHash){
            data = web3.eth.abi.decodeLog(params,events[i].raw.data,events[i].topics)
            res.push(data)
        }
        
    }
    return res
};
module.exports = {
    getData: PAST_EVENT
}