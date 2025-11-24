package usecases

import (
	"betrack/pkg/domain"
	"betrack/pkg/repositories/interfaces"
	"context"

	services "betrack/pkg/usecases/interfaces"
)

type betUseCase struct {
	betRepository interfaces.BetRepository
}

func NewBetUseCase(repository interfaces.BetRepository) services.BetUseCase {
	return &betUseCase{
		betRepository: repository,
	}
}

func (c *betUseCase) FindAll(ctx context.Context) ([]domain.Bet, error) {
	bets, err := c.betRepository.FindAll(ctx)
	return bets, err
}

func (c *betUseCase) FindById(ctx context.Context, id uint) (domain.Bet, error) {
	bet, err := c.betRepository.FindById(ctx, id)
	return bet, err
}

func (c *betUseCase) Save(ctx context.Context, bet domain.Bet) (domain.Bet, error) {
	bet, err := c.betRepository.Save(ctx, bet)

	return bet, err
}

func (c *betUseCase) Delete(ctx context.Context, id uint) error {
	err := c.betRepository.Delete(ctx, id)

	return err
}

func (c *betUseCase) FindStat(ctx context.Context) (domain.Stat, error) {
	var stat = domain.Stat{
		AverageBet:  33,
		Median:      10,
		AverageGain: 45,
		TotalGain:   353,
	}

	return stat, nil
}
