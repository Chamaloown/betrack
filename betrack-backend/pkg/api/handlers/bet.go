package handlers

import (
	services "betrack/pkg/usecases/interfaces"
	"net/http"

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
	return
}

func (cr *BetHandler) Save(c *gin.Context) {
	return
}

func (cr *BetHandler) Delete(c *gin.Context) {
	return
}
