package handler

import (
	"net/http"
	"time"

	"git.labs.daneshvar.studio/daneshvar/notes/model"
	"git.labs.daneshvar.studio/daneshvar/notes/utility"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func (h *Handler) SignUp(c echo.Context) (err error) {
	// Bind
	u := &model.User{ID: bson.NewObjectId()}
	if err = c.Bind(u); err != nil {
		return
	}

	if err = c.Validate(u); err != nil {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: err.Error()}
	}

	// Validate
	if u.Email == "" || u.Password == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "Invalid email or password"}
	}

	// Make and hash password
	u.Password = utility.HashAndSalt([]byte(u.Password))

	// Save user
	db := h.MDB.Clone()
	defer db.Close()
	if err = db.DB("teacher").C("users").Insert(u); err != nil {
		return
	}

	return c.NoContent(http.StatusCreated)
}
func (h *Handler) SignIn(c echo.Context) (err error) {
	// Bind
	u := new(model.User)
	if err = c.Bind(u); err != nil {
		return
	}

	// Store password which user entered
	password := u.Password

	// Find user
	db := h.MDB.Clone()
	defer db.Close()
	if err = db.DB("teacher").C("users").Find(bson.M{"email": u.Email}).One(&u); err != nil {
		if err == mgo.ErrNotFound {
			return &echo.HTTPError{Code: http.StatusUnauthorized, Message: "Invalid email or password"}
		}
		return
	}

	if err = utility.ComparePasswords(u.Password, []byte(password)); err != nil {
		if err == mgo.ErrNotFound {
			return &echo.HTTPError{Code: http.StatusUnauthorized, Message: "Invalid email or password"}
		}
		return
	}

	//-----
	// JWT
	//-----

	// Create token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["userID"] = u.ID.Hex()
	claims["expireDate"] = time.Now().Add(time.Hour * 72).Unix()

	// Generate encoded token and send it as response
	t, err := token.SignedString([]byte(model.SecretKey))
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, model.UserSession{Token: t})
}
func (h *Handler) SignOut(c echo.Context) (err error) {
	return c.HTML(http.StatusOK, "GoodBye")
}
