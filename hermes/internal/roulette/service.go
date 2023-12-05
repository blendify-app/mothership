package roulette

import (
	"context"
	"errors"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type service struct {
	repo Repository
}

type Service interface {
	Get(ctx context.Context, id string) (Roulette, error)
	Create(ctx context.Context, input CreateRouletteSessionRequest) (Roulette, error)
	Delete(ctx context.Context, id string) (bool, error)
}

type CreateRouletteSessionRequest struct {
	ID     string `json:"_id,omitempty" bson:"_id,omitempty"`
	UserID string `json:"user_id,omitempty" bson:"user_id,omitempty"`
}

func (m CreateRouletteSessionRequest) validate() error {
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

func (s service) Create(ctx context.Context, req CreateRouletteSessionRequest) (Roulette, error) {
	if err := req.validate(); err != nil {
		return Roulette{}, err
	}

	result, err := s.repo.Create(ctx, Roulette{
		UserID: req.UserID,
	})
	if err != nil {
		return Roulette{}, err
	}

	objID, ok := result.InsertedID.(primitive.ObjectID)
	if !ok {
		return Roulette{}, errors.New("cannot convert InsertedID to ObjectID")
	}

	return Roulette{
		ID: objID.Hex(),
	}, nil
}

func (s service) Delete(ctx context.Context, id string) (bool, error) {
	_, err := s.repo.Delete(ctx, id)
	if err != nil {
		return false, err
	}

	return true, nil
}
