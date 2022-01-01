import express from 'express'
import { currencyData } from '../data/currencyData'
import { isInt } from '../helper/index'
const router = express.Router()

router.post('/convert', (req, res, next) => {
    const { source, target, amount } = req.body
    if (!source || !target || !amount) {
        return res.status(400).json({ status: 'fail', msg: 'required params missing' })
    }

    // check all params are valid
    if (source === target) {
        return res.status(400).json({ status: 'fail', msg: 'source cannot be same with target' })
    }

    let targetRate
    const sourceData = currencyData[source]
    if (sourceData && sourceData[source] === 1 && sourceData[target]) {
        targetRate = sourceData[target]
    } else {
        return res.status(400).json({ status: 'fail', msg: 'source or target is wrong' })
    }

    if (!isInt(amount)) {
        return res.status(400).json({ status: 'fail', msg: 'amount must be an integer and bigger than 0' })
    }

    // do exchange
    const newAmount = amount * targetRate
    const roudedAmount = Math.round(newAmount * 100) / 100

    const amountArray = roudedAmount.toString().split(".");
    amountArray[0] = amountArray[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const result = amountArray.join(".")

    return res.json({ status: 'success', amount: result })
})

export default router