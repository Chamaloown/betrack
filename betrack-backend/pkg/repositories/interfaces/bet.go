package interfaces

import (
	"betrack/pkg/domain"
	"context"
)

type BetRepository interface {
	FindAll(ctx context.Context) ([]domain.Bet, error)
	FindById(ctx context.Context, id uint) (domain.Bet, error)
	Save(ctx context.Context, bet domain.Bet) (domain.Bet, error)
	Delete(ctx context.Context, id uint) error
}
