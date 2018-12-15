package handler

import (
	"net/http"

	"github.com/labstack/echo"
	"gopkg.in/mgo.v2"
)

type Handler struct {
	MDB *mgo.Session //Mongo DB
}

func (h *Handler) ReactApplication(c echo.Context) error {
	return c.Render(http.StatusOK, "index.html", "")
}
