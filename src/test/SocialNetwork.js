//const { assert } = require('chai');
//const _deploy_contracts = require('../../migrations/2_deploy_contracts');

const { assert } = require('chai');
const { default: Web3 } = require('web3');

const SocialNetwork = artifacts.require("SocialNetwork");

require('chai')
    .use(require('chai-as-promised'))
    .should()

//_deploy_contracts('SocialNetwork', (accounts) => {
contract('SocialNetwork', ([deployer, author, tipper]) => {
    let socialNetwork

    before(async () => {
        socialNetwork = await SocialNetwork.deployed()
    })
    
    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await socialNetwork.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await socialNetwork.name()
            assert.equal(name, 'Dapp University Social Network Demo')
        })
    })
        
    describe('posts', async () => {
        const content = 'This is my first post'
        let result, postCount

        before(async () => {
            result = await socialNetwork.createPost(content, { from: author })
            postCount = await socialNetwork.postCount()
        })

        it('allows post create', async () => {
            // SUCCESS
            assert.equal(postCount, 1)

            //console.log(result.logs[0].args)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(event.content, content, 'content is correct')
            assert.equal(event.tipAmount, 0, 'tip amount is correct')
            assert.equal(event.author, author, 'author is correct')

            // FAILURE
            await socialNetwork.createPost('', { from: author }).should.be.rejected;
        })
        it('allows post list', async () => {
            const post = await socialNetwork.posts(postCount)
            assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(post.content, content, 'content is correct')
            assert.equal(post.tipAmount, 0, 'tip amount is correct')
            assert.equal(post.author, author, 'author is correct')
        })
        it('allows post tip', async () => {
            const tipAmount = web3.utils.toWei('1', 'Ether')
            let oldAuthorBalance
            oldAuthorBalance = await web3.eth.getBalance(author)
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

            result = await socialNetwork.tipPost(postCount, { from: author, value: tipAmount })
            
            let newAuthorBalance
            newAuthorBalance = await web3.eth.getBalance(author)
            newAuthorBalance = new web3.utils.BN(newAuthorBalance)

            const event = result.logs[0].args

            // SUCCESS
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(event.content, content, 'content is correct')
            assert.equal(event.tipAmount, web3.utils.toWei('1', 'Ether'), 'tip amount is correct')
            assert.equal(event.author, author, 'author is correct')
            
            const expectedAuthorBalance = oldAuthorBalance.add(new web3.utils.BN(tipAmount))
            assert.equal(oldAuthorBalance.toString(), expectedAuthorBalance.toString())
  
            // FAILURE
            await socialNetwork.tipPost(-1, { from: author, value: tipAmount }).should.be.rejected
        })
    })
})