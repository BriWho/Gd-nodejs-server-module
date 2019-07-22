extends Node2D


func _on_Timer_timeout():
	client.send(Plane(1,2,3,4))
	pass

