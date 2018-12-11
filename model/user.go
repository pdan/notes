package model

import (
	"gopkg.in/mgo.v2/bson"
)

type Role int

const (
	Admin Role = iota
	Teacher
	Student
)

type User struct {
	ID    bson.ObjectId `json:"id" bson:"_id"`
	Name  string        `json:"name" bson:"name"`
	Email string        `json:"email" bson:"email" validate:"regexp=^[0-9a-z]+@[0-9a-z]+(\\.[0-9a-z]+)+$"`
	// Username string        `json:"username" bson:"username"`
	Password string `bson:"password" validate:"min=8"`
	Status   string `json:"status" bson:"status"`
	Phone    string `json:"phone" bson:"phone"`
	Role     Role   `json:"role" bson:"role"`
}

type UserSession struct {
	Token string `json:"token"`
}
