package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type Note struct {
	ID      bson.ObjectId `json:"id" bson:"_id"`
	Created time.Time     `json:"created" bson:"created"`
	Updated time.Time     `json:"updated" bson:"updated"`
	Content string        `json:"content" bson:"content"`
	User    bson.ObjectId `json:"user" bson:"user"`
}
