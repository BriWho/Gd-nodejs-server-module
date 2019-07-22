extends Node2D


func _on_Timer_timeout():
	print('send : ' ,OS.get_ticks_msec())
	client.send('')
	pass

