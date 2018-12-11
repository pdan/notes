package main

import (
	"git.labs.daneshvar.studio/daneshvar/notes/handler"
	"git.labs.daneshvar.studio/daneshvar/notes/model"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/gommon/log"
	mgo "gopkg.in/mgo.v2"
	validator "gopkg.in/validator.v2"
)

type CustomValidator struct {
	validator *validator.Validator
}

func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.validator.Validate(i)
}

func initDB() *mgo.Session {

	mdb, err := mgo.Dial("mongodb")
	if err != nil {
		log.Fatal(err)
	}
	return mdb
}

func migrate(db *mgo.Session) {
	if err := db.Copy().DB("notes").C("users").EnsureIndex(mgo.Index{
		Key:    []string{"email"},
		Unique: true,
	}); err != nil {
		log.Fatal(err)
	}
}

func main() {

	// Database connection
	mdb := initDB()
	migrate(mdb)

	// Initialize handler
	h := &handler.Handler{
		MDB: mdb, // Mongo Database
	}

	e := echo.New()

	e.Logger.SetLevel(log.ERROR)
	e.Validator = &CustomValidator{validator: validator.NewValidator()}

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Serve public directory
	e.Static("/static", "public")

	// User Sign routes
	e.POST("/api/user/signup", h.SignUp)
	e.POST("/api/user/signin", h.SignIn)

	// Unauthenticated route
	// e.GET("/", accessible)

	// Restricted group
	api := e.Group("/api")
	api.Use(middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey:  []byte(model.SecretKey),
		TokenLookup: "cookie:token",
	}))

	api.POST("/user/signout", h.SignOut)

	api.PUT("/note", h.AddNote)
	api.POST("/note", h.UpdateNote)
	api.GET("/note", h.GetNote)
	api.GET("/note/list", h.GetNotesList)
	api.DELETE("/note", h.DeleteNote)

	e.Logger.Fatal(e.Start(":1313"))
}
