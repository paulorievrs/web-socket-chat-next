
import type { Server as HTTPServer } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Socket as NetSocket } from 'net'
import { Server as IOServer } from 'socket.io'

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}


const SocketHandler = (_: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    console.log('Socket is already running.')
  } else {
    console.log('Socket connected.', res.socket)

    console.log('Socket is initializing...')

    const io = new IOServer(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      socket.on('message', (msg) => {
        console.log('Message received')
        socket.broadcast.emit('chat-message', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler;