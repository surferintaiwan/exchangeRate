import express from 'express'

const app = express()
const port = 3000
app.use(express.json())

app.post('/currencyConvert', function (req, res) {
    console.log('hello')
})

app.listen(port, () => {
    console.log(`app is running on port:${port}`)
})