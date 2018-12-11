package handler

import "gopkg.in/mgo.v2"

type Handler struct {
	MDB *mgo.Session //Mongo DB
}
