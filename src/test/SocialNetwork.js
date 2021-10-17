//const { assert } = require('chai');
//const _deploy_contracts = require('../../migrations/2_deploy_contracts');

const { assert } = require('chai');

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
        it('creates', async () => {
            const content = 'This is my first post'
            const result = await socialNetwork.createPost(content, { from: author })
            const postCount = await socialNetwork.postCount()

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
        /* it('lists', async () => {
            // todo
        })
        it('tips', async () => {
            // todo
        }) */
    })
})