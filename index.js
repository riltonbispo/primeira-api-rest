import express, { request, response } from "express";
import { StatusCodes } from "http-status-codes";

const app = express();
const PORT = process.env.PORT || 5000 ;
let users = [
  {id: 1, name: 'Rilton', age: 19},
  {id: 2, name: 'Lucas', age:21},
]

// define que todos os request é do formato json
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})

app.get('/', (request, response)=>{
  return response.send('<h1>Express</h1>')
})

app.get('/users', (request, response)=>{
  return response.send(users)
})

app.get('/users/:userId', (request, response)=>{
  // esse id é o que é passado na url
  const userId = request.params.userId
  // o find vai percorrer o array users, ate encoronte o primeiro elemento compativel com as comparação no return
  const user = users.find(user =>{
    return (user.id === Number(userId)) 
  })
  return response.send(user)
})

app.post('/users', (request, response)=>{
  const newUser = request.body
  
  users.push(newUser)
  
  return response.status(StatusCodes.CREATED).send(newUser);
})

app.put('/users/:userId', (request, response)=>{
  const userId = request.params.userId
  const updatedUser = request.body

  users = users.map(user =>{
    if (Number(userId) === user.id) {
      return updatedUser
    }
    return user
  })

  return response.send(updatedUser)
})


app.delete('/users/:userID', (request, response)=>{
  const userID = request.params.userID

  users = users.filter((user) => user.id !== Number(userID))

  return response.status(StatusCodes.NO_CONTENT).send()
})