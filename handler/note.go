package handler

import (
	"net/http"
	"time"

	"git.labs.daneshvar.studio/daneshvar/notes/model"
	"git.labs.daneshvar.studio/daneshvar/notes/utility"
	"github.com/labstack/echo"
	"gopkg.in/mgo.v2/bson"
)

func (h *Handler) AddNote(c echo.Context) (err error) {
	// Bind
	n := &model.Note{ID: bson.NewObjectId()}
	if err = c.Bind(n); err != nil {
		return
	}

	if err = c.Validate(n); err != nil {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: err.Error()}
	}

	n.User = bson.ObjectIdHex(utility.GetTokenClaim("userID", c).(string))
	n.Created = time.Now().UnixNano()
	n.Updated = time.Now().UnixNano()

	for i, _ := range n.Categories {
		n.Categories[i].ID = bson.NewObjectId()
	}

	// h.SyncCategories(n.User)

	// Save user
	db := h.MDB.Clone()
	defer db.Close()
	if err = db.DB("notes").C("notes").Insert(n); err != nil {
		return
	}

	return c.NoContent(http.StatusCreated)
}

func (h *Handler) UpdateNote(c echo.Context) (err error) {
	// Bind
	n := &model.Note{}
	if err = c.Bind(n); err != nil {
		return
	}

	if err = c.Validate(n); err != nil {
		return
	}

	if user := bson.ObjectIdHex(utility.GetTokenClaim("userID", c).(string)); user != n.User {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "User mismatch"}
	}

	n.Updated = time.Now().UnixNano()

	// Save user
	db := h.MDB.Clone()
	defer db.Close()
	if err = db.DB("notes").C("notes").Update(bson.M{"_id": n.ID}, n); err != nil {

		return
	}

	return c.NoContent(http.StatusOK)
}

func (h *Handler) GetNote(c echo.Context) (err error) {
	return c.NoContent(http.StatusOK)
}

func (h *Handler) GetNotesList(c echo.Context) (err error) {
	notes := []model.Note{}

	uid := bson.ObjectIdHex(utility.GetTokenClaim("userID", c).(string))
	// log.Println([1]bson.ObjectId{uid}[0])
	h.MDB.DB("notes").C("notes").Find(bson.M{"user": uid}).Sort("$natural").All(&notes)
	return c.JSON(http.StatusOK, notes)
}

func (h *Handler) DeleteNote(c echo.Context) (err error) {
	return c.NoContent(http.StatusOK)
}

func (h *Handler) SyncCategories(id bson.ObjectId) (err error) {
	u := &model.User{}
	db := h.MDB.Clone()
	defer db.Close()
	db.DB("notes").C("users").Find(bson.M{"_id": id}).All(u)
	// log.Println(u)
	return nil
}
