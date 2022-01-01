import express from 'express'
import { currencyData } from './data/currencyData'
import { isInt } from './helper/index'

const app = express()
const Port = 3000
app.use(express.json())

app.post('/currencyConvert', function (req, res, next) {
    const { source, target, amount } = req.body
    if (!source || !target || !amount) {
        return res.json({ status: 'fail', msg: 'required params missing' })
    }

    try {
        // check all params are valid
        if (source === target) {
            return res.json({ status: 'fail', msg: 'sourceCurrency cannot be same with targerCurrency' })
        }

        let targetRate
        const sourceData = currencyData[source]
        if (sourceData && sourceData[source] === 1) {
            targetRate = sourceData[target]
        } else {
            return res.json({ status: 'fail', msg: 'sourceCurrency or targerCurrency is wrong' })
        }

        if (!isInt(amount)) {
            return res.json({ status: 'fail', msg: 'amount must be an integer and bigger than 0' })
        }

        // do exchange
        const newAmount = amount * targetRate
        const roudedAmount = Math.round(newAmount * 100) / 100
        console.log(roudedAmount)

        const amountArray = roudedAmount.toString().split(".");
        amountArray[0] = amountArray[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const result = amountArray.join(".")
        return res.json({ status: 'success', result })

        // console.log("1,234,567.89".replace(/,/g, ''))
    } catch (error) {
        next(error)
    }

})

app.listen(Port, () => {
    console.log(`Server is running on Port ${Port}`)
})