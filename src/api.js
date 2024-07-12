const axios = require('axios')

const http = axios.create({
  baseURL: 'https://api.boost.xyz/boosts'
});

async function getBoost(id) {
  // An equivalent to `GET /users?id=12345`
  return await http.get(`/${id}`);
}
function getDbObj(data){
  return {
    appLink: data.appLink,
    imagePath:data.metadata.image,
    name: data.metadata.name,
    description: data.description,
    network: data.network,
    contractAddress: data.contractAddress,
    creatorAddress: data.creatorAddress,
    actionFee: data.actionFee,
    projectFee: data.projectFee,
    reward:{
      type: data.reward.type,
      amount: data.reward.amount,
      token: data.reward.token,
      s3Link:data.reward.s3Link
    },
    actionParams: {
      type: data.actionParams.type,
      data: {
          chainId: data.actionParams.data.chainId,
          tokenId: data.actionParams.data.tokenId,
          contractAddress: data.actionParams.data.contractAddress
      }
    },
    totalParticipants: data.totalParticipants,
    numberMinted: data.numberMinted
  }
}
module.exports = {
  getBoost: getBoost,
  getDbObj: getDbObj
}