import {server} from "../index"
import {Server} from "socket.io"


export class ServerSocket {
	static io: Server
	static users: any = new Map()

	static async addClientToMap(data: any) {
		this.users.set(data.username, data)
		console.log(`${data.username}:`, data)
		await this.updateTopList()
	}

	static async sendToClients(event: string, data: any) {
		if (this.io.engine.clientsCount > 0) {
			this.io.emit(event, data)
		}
	}

	static async updateTopList() {
		// сформировать ответ
		const usersArr = [...this.users.values()]
			.sort(([, a], [, b]) => b.clicks - a.clicks)
			.slice(0, 5)

		// разослать всем
		await this.sendToClients("top_list", usersArr)
	}

	static async init() {
		await this.initServerSocket()
	}

	static async incomingHandler(socket: any, data: any) {
		console.log("Incoming handler", socket, data)

		const events: any = {
			"ping": (socket: any, data: any) => socket.emit("pong", data),
			"client_data": (socket: any, data: any) => {
				console.log("Client data", data)
				this.addClientToMap(data)
			},
			"init": async (socket: any, data: any) => this.addClientToMap(data)
		}

		if (!data?.event) return

		if (data.event in events) {
			events[data.event](socket, data)
		}
	}

	static async initServerSocket() {
		this.io = new Server(server, {
			cors: {
				origin: "*"
			}
		})
		console.log("Server socket created")

		let activityClient: any = null

		this.io.on("connection", socket => {
			activityClient = socket
			console.log("Client connected", socket.id)

			socket.on("ws-emit", async (data) => await this.incomingHandler(data, socket))

			this.updateTopList()

			socket.on("disconnect", async (reason) => {
				activityClient = null
				console.log("Client disconnected", socket.id, reason)
				await this.updateTopList()
			})
		})

		function sendToIframe(event: string, data: any) {
			if (!activityClient) return

			activityClient.emit("message", {
				type: "ws-event",
				event,
				data
			})
		}
	}

}
