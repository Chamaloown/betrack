package domain

type Stat struct {
	AverageBet  int `json:"averageBet"`
	Median      int `json:"median"`
	AverageGain int `json:"averageGain"`
	TotalGain   int `json:"totalGain"`
}
