package profiles

import (
	"context"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
)

type service struct {
	repo Repository
}

type Service interface {
	Get(ctx context.Context, id string) (Profile, error)
	Create(ctx context.Context, profile Profile) (Profile, error)
	Update(ctx context.Context, data map[string]interface{}) (Profile, error)
	Delete(ctx context.Context, id string) (bool, error)
}

// TODO: add other validation rules
func (p Profile) validate() error {
	err := validation.ValidateStruct(&p,
		validation.Field(&p.ID, validation.Required),
		validation.Field(&p.UserID, validation.Required),
	)
	if err != nil {
		return err
	}

	err = validation.ValidateStruct(&p.Basic,
		validation.Field(&p.Basic.Name, validation.Required),
		validation.Field(&p.Basic.Email, validation.Required, is.Email),
	)

	return err
}

func NewService(repo Repository) Service {
	return service{repo}
}

func (s service) Get(ctx context.Context, id string) (Profile, error) {
	user, err := s.repo.Get(ctx, id)
	if err != nil {
		return Profile{}, err
	}

	return user, nil
}

func (s service) Create(ctx context.Context, profile Profile) (Profile, error) {
	if err := profile.validate(); err != nil {
		return Profile{}, err
	}

	_, err := s.repo.Create(ctx, profile)
	if err != nil {
		return Profile{}, err
	}

	return profile, nil
}

func (s service) Update(ctx context.Context, data map[string]interface{}) (Profile, error) {
	_, err := s.repo.Update(ctx, data)
	if err != nil {
		return Profile{}, err
	}
	return Profile{}, nil
}

func (s service) Delete(ctx context.Context, id string) (bool, error) {
	_, err := s.repo.Delete(ctx, id)
	if err != nil {
		return false, err
	}

	return true, nil
}
