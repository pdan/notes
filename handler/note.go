package handler

import (
	"net/http"

	"github.com/labstack/echo"
)

func (h *Handler) AddNote(c echo.Context) (err error) {
	return c.NoContent(http.StatusOK)
}

func (h *Handler) UpdateNote(c echo.Context) (err error) {
	return c.NoContent(http.StatusOK)
}

func (h *Handler) GetNote(c echo.Context) (err error) {
	return c.NoContent(http.StatusOK)
}

func (h *Handler) GetNotesList(c echo.Context) (err error) {
	return c.NoContent(http.StatusOK)
}

func (h *Handler) DeleteNote(c echo.Context) (err error) {
	return c.NoContent(http.StatusOK)
}
