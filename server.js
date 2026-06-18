const Contact = require('./models/Contact')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('MongoDB connected!'))
.catch((err)=> console.log(err))
mongoose.connection.on('error', (err) => {
    console.log('MongoDB error:', err)
})
mongoose.connection.on('connected', () => {
    console.log('MongoDB fully connected!')
})
app.use(cors())
app.use(express.json())
app.get('/', (req, res)=>{
    res.json({message: 'Backend is running'})
})

// app.post('/contact', (req, res)=>{
//     console.log(req.body);
//     res.json({ message: 'Message Received!'})
    
// })

app.post('/contact', (req, res)=>{
    console.log(req.body)
    const newContact = new Contact({ name: req.body.name, email: req.body.email, message: req.body.message
    })
    async function saveContact() {
    try {
        const saved = await newContact.save()
        console.log(saved)
        res.json({ message: 'Message saved!' })
    } catch (err) {
        console.log('Save error:', err)
    }
}
saveContact()
})


app.get('/about', (req, res) =>{
    res.json({ name: 'Muhammad Kheiroum Jibreel',
        title: 'Full Stack Developer',
        skills:['Html', 'CSS', 'JavaScript', 'React', 'React Router', 'CSS Modules', 'useContext', 'Custom Hooks', 'Express js', 'Node js', 'Git Basics', 'Responsive Design'] 
    })
})

app.get('/projects',(req, res)=>{
    res.json([{id: 1,
        project: 'Weather App',
        description: 'A responsive weather application that fetches real-time weather data based on user location, built to practice API integration and dynamic UI updates.', 
        techStack: ['MongoDB', 'Express', 'React', 'Node js'],
        githubLink: '#',
        liveLink: '#' },
        {id: 2,
        project: 'Portfolio website',
        description: 'A full stack personal portfolio built with React, Express, and MongoDB featuring dark mode, dynamic content fetched from a custom REST API, and a working contact form connected to a live database.', 
        techStack: ['MongoDB' , 'Express' , 'React' , 'Node js'],
        githubLink: 'https://github.com/Kheiroum2000/my-portfolio',
        liveLink: 'https://musical-sunshine-7e7dde.netlify.app/'}
    ])
})

app.listen(5000, () => {
    console.log('Server running on port 5000');
    
})