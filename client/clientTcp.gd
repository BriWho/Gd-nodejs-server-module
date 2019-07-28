extends Node

const PORT : int = 8080
const HOST : String = '127.0.0.1'
const disconnect_waittime : int = 10
var client : StreamPeerTCP = null
var peerstream : PacketPeerStream = null
var reconnect : Timer = null
var err_count : int = 0
var connected : bool = false

signal disconnect()
signal data_arrived(data)

func _ready():
	_connect_to_server()
	
func _is_connected():
	return client.get_status() == StreamPeerTCP.STATUS_CONNECTED
	
func _connect_to_server():
	
	client = StreamPeerTCP.new()
	reconnect = Timer.new()
	reconnect.set_wait_time(1)
	reconnect.set_one_shot(false)
	reconnect.connect('timeout' , self , '_on_reconnect')
	add_child(reconnect)
	
	connect_to_server()
	
	return 0
	
func _process(delta):
	if !connected and _is_connected():
		connected = true
		reconnect.stop()
		
		peerstream = PacketPeerStream.new()
		peerstream.set_stream_peer(client)
		
	if connected and not _is_connected():
		connected = false
		reconnect.start()
		err_count = 0
		
	if connected:
		if peerstream.get_available_packet_count() > 0:
			var data = peerstream.get_var()
			print(data ,' (', typeof(data) ,'): ' , OS.get_ticks_msec())
			emit_signal('data_arrived' , data)
		pass
		
func _on_reconnect():
	if client.get_status() == StreamPeerTCP.STATUS_NONE:
		client.connect_to_host(HOST , PORT)
	if client.get_status() == StreamPeerTCP.STATUS_ERROR or err_count > disconnect_waittime:
		emit_signal('disconnect')
		client.disconnect_from_host()
		reconnect.stop()

	print('trying to connect to server ...')
	err_count += 1

func _exit_tree():
	disconnect_from_host()

func connect_to_server():
	client.connect_to_host( HOST , PORT )
	err_count = 0
	reconnect.start()

func disconnect_from_host():
	client.disconnect_from_host()
			
func send(data):
	if connected:
		peerstream.put_var(data)
