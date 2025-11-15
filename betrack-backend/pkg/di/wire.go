//go:build wireinject
// +build wireinject

package di

import (
	http "betrack/pkg/api"
	handlers "betrack/pkg/api/handlers"
	"betrack/pkg/config"
	db "betrack/pkg/db"
	repositories "betrack/pkg/repositories"
	usecases "betrack/pkg/usecases"

	wire "github.com/google/wire"
)

func InitializeApi(cfg config.Config) (*http.ServerHTTP, error) {
	wire.Build(db.ConnectDatabase, repositories.NewBetRepository, usecases.NewBetUseCase, handlers.NewUserHandler, http.NewServerHTTP)

	return &http.ServerHTTP{}, nil
}
