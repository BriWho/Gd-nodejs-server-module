extends Node2D


func _on_Timer_timeout():
	print('send : ' ,OS.get_ticks_msec())

	client.send({'1234':{1215:Vector2(1122,556)}})
	pass

