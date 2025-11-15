package domain

type Bet struct {
	Date      string  `json:"date"`
	Bookmaker string  `json:"bookmaker"`
	Sport     string  `json:"sport"`
	Type      string  `json:"type"`
	Bet       int     `json:"bet"`
	Cote      float64 `json:"cote"`
	IsWin     bool    `json:"isWin"`
	Money     int     `json:"money"`
}
