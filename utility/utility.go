package utility

import (
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"os"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"golang.org/x/crypto/bcrypt"
)

func HashAndSalt(p []byte) string {
	// Use GenerateFromPassword to hash & salt pwd
	// MinCost is just an integer constant provided by the bcrypt
	// package along with DefaultCost & MaxCost.
	// The cost can be any value you want provided it isn't lower
	// than the MinCost (4)
	hash, err := bcrypt.GenerateFromPassword(p, bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}
	// GenerateFromPassword returns a byte slice so we need to
	// convert the bytes to a string and return it
	return string(hash)
}

func ComparePasswords(h string, p []byte) error {
	// Since we'll be getting the hashed password from the DB it
	// will be a string so we'll need to convert it to a byte slice
	byteHash := []byte(h)
	err := bcrypt.CompareHashAndPassword(byteHash, p)
	if err != nil {
		return err
	}

	return nil
}

func SaveFile(file multipart.File, path string) error {
	data, err := ioutil.ReadAll(file)
	if err != nil {

		return err
	}

	err = ioutil.WriteFile(path, data, 0666)
	if err != nil {

		return err
	}

	return nil
}

func GetTokenClaim(title string, c echo.Context) interface{} {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	return claims[title]
}

func SaveUploadedFile(file *multipart.FileHeader, to string, filename string) error {

	//-----------
	// Read file
	//-----------
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	if filename == "" {
		filename = file.Filename
	}

	// Destination
	dst, err := os.Create("public" + to + "/" + filename)
	if err != nil {
		return err
	}
	defer dst.Close()

	// Copy
	if _, err = io.Copy(dst, src); err != nil {
		return err
	}

	return nil
}
