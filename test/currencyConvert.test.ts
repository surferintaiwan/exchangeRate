import should from 'should'
import supertest from 'supertest'
import app from '../app'
import { StatusCodes } from 'http-status-codes'
const agent = supertest.agent(app)
describe('currencyConvert', function () {
    describe('Fail: required params missing', function () {
        it('Fail: source missing', async function () {
            const response = await agent.post('/api/currency/convert').send({
                target: "JPY",
                amount: 123456
            })

            should(response.status).be.eql(StatusCodes.BAD_REQUEST)
            should(response.body).match({ status: 'fail', msg: 'required params missing' })
        })

        it('Fail: target missing', async function () {
            const response = await agent.post('/api/currency/convert').send({
                source: "TWD",
                amount: 123456
            })

            should(response.status).be.eql(StatusCodes.BAD_REQUEST)
            should(response.body).match({ status: 'fail', msg: 'required params missing' })
        })

        it('Fail: amount missing', async function () {
            const response = await agent.post('/api/currency/convert').send({
                source: "TWD",
                target: "JPY",
            })

            should(response.status).be.eql(StatusCodes.BAD_REQUEST)
            should(response.body).match({ status: 'fail', msg: 'required params missing' })
        })

        it('Fail: amount is 0', async function () {
            const response = await agent.post('/api/currency/convert').send({
                source: "TWD",
                target: "JPY",
                amount: 0
            })

            should(response.status).be.eql(StatusCodes.BAD_REQUEST)
            should(response.body).match({ status: 'fail', msg: 'required params missing' })
        })
    })

    it('Fail: source cannot be same with target', async function () {
        const response = await agent.post('/api/currency/convert').send({
            source: "TWD",
            target: "TWD",
            amount: 123456
        })

        should(response.status).be.eql(StatusCodes.BAD_REQUEST)
        should(response.body).match({ status: 'fail', msg: 'source cannot be same with target' })
    })

    describe('Fail: source or target is wrong', function () {
        it('Fail: source is wrong', async function () {
            const response = await agent.post('/api/currency/convert').send({
                source: "TDW",
                target: "JPY",
                amount: 123456
            })

            should(response.status).be.eql(StatusCodes.BAD_REQUEST)
            should(response.body).match({ status: 'fail', msg: 'source or target is wrong' })
        })

        it('Fail: target is wrong', async function () {
            const response = await agent.post('/api/currency/convert').send({
                source: "TWD",
                target: "JYP",
                amount: 123456
            })

            should(response.status).be.eql(StatusCodes.BAD_REQUEST)
            should(response.body).match({ status: 'fail', msg: 'source or target is wrong' })
        })
    })

    describe('Fail: amount must be an integer and bigger than 0', function () {
        it('Fail: amount is a string with prefix zero', async function () {
            const response = await agent.post('/api/currency/convert').send({
                source: "TWD",
                target: "JPY",
                amount: "0123456"
            })

            should(response.status).be.eql(StatusCodes.BAD_REQUEST)
            should(response.body).match({ status: 'fail', msg: 'amount must be an integer and bigger than 0' })
        })

        it('Fail: amount is a negative number', async function () {
            const response = await agent.post('/api/currency/convert').send({
                source: "TWD",
                target: "JPY",
                amount: -1000
            })

            should(response.status).be.eql(StatusCodes.BAD_REQUEST)
            should(response.body).match({ status: 'fail', msg: 'amount must be an integer and bigger than 0' })
        })

        it('Fail: amount is float number', async function () {
            const response = await agent.post('/api/currency/convert').send({
                source: "TWD",
                target: "JPY",
                amount: 12.333
            })

            should(response.status).be.eql(StatusCodes.BAD_REQUEST)
            should(response.body).match({ status: 'fail', msg: 'amount must be an integer and bigger than 0' })
        })
    })

    describe('Success', function () {
        it('Success: source = TWD, target = JPY, amount = 1', async function () {
            const response = await agent.post('/api/currency/convert').send({
                source: "TWD",
                target: "JPY",
                amount: 1
            })

            should(response.status).be.eql(StatusCodes.OK)
            const result = response.body
            should(result.status).be.eql('success')
            should(result.amount).be.eql('3.67')
        })

        it('Success: source = TWD, target = JPY, amount = 1000', async function () {
            const response = await agent.post('/api/currency/convert').send({
                source: "TWD",
                target: "JPY",
                amount: 1000
            })

            should(response.status).be.eql(StatusCodes.OK)
            const result = response.body
            should(result.status).be.eql('success')
            should(result.amount).be.eql('3,669')
        })

        it('Success: source = TWD, target = JPY, amount = 123456', async function () {
            const response = await agent.post('/api/currency/convert').send({
                source: "TWD",
                target: "JPY",
                amount: 123456
            })

            should(response.status).be.eql(StatusCodes.OK)
            const result = response.body
            should(result.status).be.eql('success')
            should(result.amount).be.eql('452,960.06')

        })

        it('Success: source = JPY, target = TWD, amount = 123456', async function () {
            const response = await agent.post('/api/currency/convert').send({
                source: "JPY",
                target: "TWD",
                amount: 123456
            })

            should(response.status).be.eql(StatusCodes.OK)
            const result = response.body
            should(result.status).be.eql('success')
            should(result.amount).be.eql('33,278.8')

        })

        it('Success: source = USD, target = TWD, amount = 123456', async function () {
            const response = await agent.post('/api/currency/convert').send({
                source: "USD",
                target: "TWD",
                amount: 123456
            })

            should(response.status).be.eql(StatusCodes.OK)
            const result = response.body
            should(result.status).be.eql('success')
            should(result.amount).be.eql('3,758,494.46')
        })
    })
})