extends Node

var client : PacketPeerUDP = null
const host : String = '127.0.0.1'
const port : int = 8080



func _ready():
	client = PacketPeerUDP.new()
	client.set_dest_address(host ,port)
	
	pass

func _process(delta):
	if client.is_listening():
		if client.get_available_packet_count() > 0:
			var data = client.get_var()
			print( "udp: " , data , " : ", OS.get_ticks_msec())

func send(data):
	client.put_var(data)