package users

import (
	"context"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
)

type service struct {
	repo Repository
}

type Service interface {
	Get(ctx context.Context, id string) (User, error)
	Create(ctx context.Context, input CreateUserRequest) (User, error)
	// Update(ctx context.Context, id string, input UpdateUserRequest) (User, error)
	Delete(ctx context.Context, id string) (bool, error)
}

type CreateUserRequest struct {
	Name  string `json:"name" bson:"name"`
	ID    string `json:"id" bson:"id"`
	Email string `json:"email" bson:"email" `
}

// type UpdateUserRequest struct {
// 	ID string `json:"id" bson:"id"`
// }

func (m CreateUserRequest) validate() error {
	return validation.ValidateStruct(&m,
		validation.Field(&m.Name, validation.Required),
		validation.Field(&m.ID, validation.Required),
		validation.Field(&m.Email, validation.Required, is.Email),
	)
}

// func (m UpdateUserRequest) Validate() error {
// 	return validation.ValidateStruct(&m,
// 		validation.Field(&m.ID, validation.Required, validation.Length(0, 128)),
// 	)
// }

func NewService(repo Repository) Service {
	return service{repo}
}

func (s service) Get(ctx context.Context, id string) (User, error) {
	user, err := s.repo.Get(ctx, id)
	if err != nil {
		return User{}, err
	}

	return user, nil
}

func (s service) Create(ctx context.Context, req CreateUserRequest) (User, error) {
	if err := req.validate(); err != nil {
		return User{}, err
	}

	_, err := s.repo.Create(ctx, User{
		ID:    req.ID,
		Name:  req.Name,
		Email: req.Email,
	})
	if err != nil {
		return User{}, err
	}

	return User{
		ID:    req.ID,
		Name:  req.Name,
		Email: req.Email,
	}, nil
}

// func (s service) Update(ctx context.Context, id string, req UpdateUserRequest) (User, error) {
// 	if err := req.Validate(); err != nil {
// 		return User{}, err
// 	}

// 	user, err := s.Get(ctx, id)
// 	if err != nil {
// 		return user, err
// 	}

// 	user.ID = req.ID

// 	if err := s.repo.Update(ctx, user); err != nil {
// 		return user, err
// 	}

// 	return user, nil
// }

func (s service) Delete(ctx context.Context, id string) (bool, error) {
	_, err := s.repo.Delete(ctx, id)
	if err != nil {
		return false, err
	}

	return true, nil
}
