// code away!
const server = require('./server');

const PORT = 5008;

server.listen(PORT, () => {
    console.log(`**Server running on Port ${PORT}**`)
})