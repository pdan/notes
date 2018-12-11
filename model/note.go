package model

import (
	"gopkg.in/mgo.v2/bson"
)

type Note struct {
	ID      bson.ObjectId `json:"id" bson:"_id"`
	Created int64         `json:"created" bson:"created"`
	Updated int64         `json:"updated" bson:"updated"`
	Content string        `json:"content" bson:"content"`
	User    bson.ObjectId `json:"user" bson:"user"`
}
