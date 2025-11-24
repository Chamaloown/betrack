package handlers

import (
	"betrack/pkg/domain"
	services "betrack/pkg/usecases/interfaces"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type BetHandler struct {
	betUseCase services.BetUseCase
}

type Response struct {
	Id        uint    `copier:"must"`
	Date      string  `copier:"must"`
	Bookmaker string  `copier:"must"`
	Sport     string  `copier:"must"`
	Type      string  `copier:"must"`
	Bet       int     `copier:"must"`
	Cote      float64 `copier:"must"`
	IsWin     bool    `copier:"must"`
	Money     int     `copier:"must"`
}

func NewUserHandler(usecase services.BetUseCase) *BetHandler {
	return &BetHandler{
		betUseCase: usecase,
	}
}

func (cr *BetHandler) FindAll(c *gin.Context) {
	bets, err := cr.betUseCase.FindAll(c.Request.Context())

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		// response := []Response{}
		// copier.Copy(&response, &bets)

		c.JSON(http.StatusOK, bets)
	}
}

func (cr *BetHandler) FindById(c *gin.Context) {
	fmt.Println("calling find by id on bet")
	paramsId := c.Param("id")
	id, err := strconv.Atoi(paramsId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "cannot parse id",
		})
		return
	}

	bet, err := cr.betUseCase.FindById(c.Request.Context(), uint(id))

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	}
	// response := Response{}
	// copier.Copy(&response, bet)

	c.JSON(http.StatusOK, &bet)

}

func (cr *BetHandler) FindStat(c *gin.Context) {
	stat, err := cr.betUseCase.FindStat(c.Request.Context())

	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
	}

	c.JSON(http.StatusOK, stat)
}

func (cr *BetHandler) Save(c *gin.Context) {
	var bet domain.Bet

	if err := c.BindJSON(&bet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}

	bet, err := cr.betUseCase.Save(c.Request.Context(), bet)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		// response := Reponse{}
		// copier.Copy(&response, bet)

		c.JSON(http.StatusCreated, bet)
	}

}

func (cr *BetHandler) Delete(c *gin.Context) {
	paramsId := c.Param("id")
	id, err := strconv.Atoi(paramsId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "cannot parse id",
		})
		return
	}

	err = cr.betUseCase.Delete(c.Request.Context(), uint(id))

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusNoContent, nil)
	}

}
