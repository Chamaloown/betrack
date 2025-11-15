package repositories

import (
	"betrack/pkg/domain"
	"betrack/pkg/repositories/interfaces"
	"context"

	"gorm.io/gorm"
)

type betRepository struct {
	DB *gorm.DB
}

func NewBetRepository(DB *gorm.DB) interfaces.BetRepository {
	return &betRepository{DB}
}

var bets = []domain.Bet{
	{
		Date:      "01/01/2025",
		Bookmaker: "Winamax",
		Sport:     "football",
		Type:      "1N2",
		Bet:       10,
		Cote:      1.5,
		IsWin:     true,
		Money:     15,
	},
	{
		Date:      "01/01/2025",
		Bookmaker: "Betclic",
		Sport:     "football",
		Type:      "1N2",
		Bet:       10,
		Cote:      1.5,
		IsWin:     true,
		Money:     15,
	},
}

func (b *betRepository) FindAll(ctx context.Context) ([]domain.Bet, error) {
	return bets, nil
}

func (b *betRepository) FindById(ctx context.Context, id uint) (domain.Bet, error) {
	return bets[id], nil
}

func (b *betRepository) Save(ctx context.Context, bet domain.Bet) (domain.Bet, error) {
	return bets[0], nil
}

func (b *betRepository) Delete(ctx context.Context, id uint) error {
	return nil
}
