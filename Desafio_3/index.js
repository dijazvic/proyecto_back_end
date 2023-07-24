import express from 'express'
import userRouter  from './routes/routes.js'
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}) )

app.use('/api/product', userRouter)

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.listen(port, () => {
  console.log(`Puerto de escucha ${port}`)
})