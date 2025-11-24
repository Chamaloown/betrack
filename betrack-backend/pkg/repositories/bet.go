package repositories

import (
	"betrack/pkg/domain"
	"betrack/pkg/repositories/interfaces"
	"context"
	"sort"

	"gorm.io/gorm"
)

type betRepository struct {
	DB *gorm.DB
}

func median(data []float64) float64 {
	dataCopy := make([]float64, len(data))
	copy(dataCopy, data)

	sort.Float64s(dataCopy)

	var median float64
	l := len(dataCopy)
	if l == 0 {
		return 0
	} else if l%2 == 0 {
		median = (dataCopy[l/2-1] + dataCopy[l/2]) / 2
	} else {
		median = dataCopy[l/2]
	}

	return median
}

func NewBetRepository(DB *gorm.DB) interfaces.BetRepository {
	return &betRepository{DB}
}

func (b *betRepository) FindAll(ctx context.Context) ([]domain.Bet, error) {
	bets, err := gorm.G[domain.Bet](b.DB).Find(ctx)

	if err != nil {
		return []domain.Bet{}, err
	}

	return bets, nil
}

func (b *betRepository) FindById(ctx context.Context, id uint) (domain.Bet, error) {
	bet, err := gorm.G[domain.Bet](b.DB).Where("id = ", id).First(ctx)

	if err != nil {
		return domain.Bet{}, err
	}

	return bet, nil

}

func (b *betRepository) FindStat(ctx context.Context) (domain.Stat, error) {
	bets, err := gorm.G[domain.Bet](b.DB).Find(ctx)

	if err != nil {
		return domain.Stat{}, err
	}

	if len(bets) <= 0 {
		return domain.Stat{}, nil
	}

	var totalBet int
	var totalGain int
	var splitedBet []float64

	for _, bet := range bets {
		totalBet += bet.Bet
		totalGain = +bet.Money
		splitedBet = append(splitedBet, float64(bet.Bet))
	}

	return domain.Stat{
		AverageBet:  totalBet / len(bets),
		Median:      int(median(splitedBet)),
		AverageGain: totalGain / len(bets),
		TotalGain:   totalGain,
	}, nil

}

func (b *betRepository) Save(ctx context.Context, bet domain.Bet) (domain.Bet, error) {
	err := b.DB.Save(&bet).Error
	return bet, err
}

func (b *betRepository) Delete(ctx context.Context, id uint) error {
	return nil
}
