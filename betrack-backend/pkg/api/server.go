package http

import (
	"betrack/pkg/api/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type ServerHTTP struct {
	engine *gin.Engine
}

func NewServerHTTP(betHandler *handlers.BetHandler) *ServerHTTP {
	engine := gin.New()

	engine.Use(gin.Logger())

	api := engine.Group("/api/v1")

	api.Use(cors.Default())

	api.GET("bets", betHandler.FindAll)
	api.GET("bets/:id", betHandler.FindById)
	api.GET("bets/stat", betHandler.FindStat)
	api.POST("bets", betHandler.Save)
	api.DELETE("bets/:id", betHandler.Delete)

	return &ServerHTTP{engine: engine}
}

func (sh *ServerHTTP) Start() {
	sh.engine.Run(":3000")
}
