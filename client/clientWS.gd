extends Node

const url : String = "ws://localhost:6300"
const disconnect_waittime : int = 10
var client : WebSocketClient = null
var reconnect : Timer = null
var err_count : int = 0
var connected : bool = false

func _ready():
	client = WebSocketClient.new()
	client.connect("connection_established", self , "_connection_established")
	client.connect("connection_closed" , self , "_connection_closed")
	client.connect("connection_error", self , "_connection_error")

	client.connect_to_url(url)
	print('connect to server')
	
func _connection_established(protocol):

	print("connect to " , protocol)
	pass
	
func _connection_closed():
	print("server closed")
	pass

func _connection_error():
	print("connection error")
	pass

func _process(delta):
	if client.get_connection_status() == WebSocketClient.CONNECTION_CONNECTING or client.get_connection_status() == WebSocketClient.CONNECTION_CONNECTED:
		client.poll()
	if client.get_peer(1).is_connected_to_host():
		if client.get_peer(1).get_available_packet_count() > 0:
			var buffer = client.get_peer(1).get_var()

	
	pass

func send(data):
	if client.get_peer(1).is_connected_to_host():
		client.get_peer(1).put_var(data)
	pass	
