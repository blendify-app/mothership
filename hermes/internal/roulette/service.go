package roulette

import (
	"context"

	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type service struct {
	repo Repository
}

type Service interface {
	Get(ctx context.Context, id string) (Roulette, error)
	Create(ctx context.Context, input Roulette) (Roulette, error)
	Delete(ctx context.Context, id string) (bool, error)
}

func (m Roulette) validate() error {
	return validation.ValidateStruct(&m,
		validation.Field(&m.UserID, validation.Required),
	)
}

func NewService(repo Repository) Service {
	return service{repo}
}

func (s service) Get(ctx context.Context, id string) (Roulette, error) {
	roulette, err := s.repo.Get(ctx, id)
	if err != nil {
		return Roulette{}, err
	}

	return roulette, nil
}

func (s service) Create(ctx context.Context, roulette Roulette) (Roulette, error) {
	if err := roulette.validate(); err != nil {
		return Roulette{}, err
	}

	_, err := s.repo.Create(ctx, roulette)
	if err != nil {
		return Roulette{}, err
	}

	return roulette, nil
}

func (s service) Delete(ctx context.Context, id string) (bool, error) {
	_, err := s.repo.Delete(ctx, id)
	if err != nil {
		return false, err
	}

	return true, nil
}
