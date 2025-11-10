package main

import (
	"betrack/models"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	var bets = []models.Bet{}

	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/bets", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"date":      "01/01/2025",
			"bookmaker": "Winamax",
			"sport":     "football",
			"type":      "1N2",
			"bet":       10,
			"cote":      1.5,
			"isWin":     true,
			"money":     15,
		})
	})

	r.POST("/bet/new", func(c *gin.Context) {
		var json models.Bet

		if err := c.ShouldBindBodyWithJSON(&json); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		bets = append(bets, json)
		c.JSON(http.StatusCreated, bets)
	})

	r.Run()
}
