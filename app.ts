import express from 'express'
import currency from './routes/currency'

const app = express()
const Port = 3000
app.use(express.json())

app.use('/api/currency', currency)

app.listen(Port, () => {
    console.log(`Server is running on Port ${Port}`)
})

export default app