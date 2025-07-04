const fs = require('fs')
const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()

// Check if db.json exists and is readable
const dbFile = path.join(__dirname, 'db.json')
console.log(`Looking for database file at: ${dbFile}`)

try {
  fs.accessSync(dbFile, fs.constants.R_OK)
  console.log('Database file found and is readable')
} catch (err) {
  console.error(`Error accessing database file: ${err.message}`)
  // Create basic db.json if it doesn't exist
  if (err.code === 'ENOENT') {
    console.log('Creating basic db.json file')
    const basicDb = { 
      users: [], 
      bookings: [], 
      hotels: [] 
    }
    try {
      fs.writeFileSync(dbFile, JSON.stringify(basicDb, null, 2))
      console.log('Created basic db.json file')
    } catch (writeErr) {
      console.error(`Failed to create db.json: ${writeErr.message}`)
    }
  }
}

const router = jsonServer.router(dbFile)
const middlewares = jsonServer.defaults({
  static: false  // Disable static serving
})

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/hotels/:id/reviews': '/reviews?hotelId=:id'
}))

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Custom middleware to handle CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

// Add a health check endpoint
server.get('/health', (req, res) => {
  res.json({ status: 'UP', message: 'Server is running' })
})

// Add a root endpoint
server.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Hotels Mock API',
    endpoints: {
      hotels: '/hotels',
      users: '/users',
      bookings: '/bookings',
      health: '/health'
    }
  })
})

// Use default router
server.use(router)

// Get port from environment or use 8080
const port = process.env.PORT || 8080

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
