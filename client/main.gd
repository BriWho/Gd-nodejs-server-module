extends Node2D


func _on_Timer_timeout():
	print('send : ' ,OS.get_ticks_msec())
	
	for i in range(0,60):
		clientTcp.send(i)
		clientUdp.send(i)
		clientWS.send(i)
		
	print('end : ' , OS.get_ticks_msec())
	pass

