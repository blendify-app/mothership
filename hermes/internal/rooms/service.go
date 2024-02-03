package rooms

import (
	"context"

	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type service struct {
	repo Repository
}

type Service interface {
	Get(ctx context.Context, id string) (Room, error)
	Create(ctx context.Context, input Room) (Room, error)
	AddUserToRoom(ctx context.Context, RoomID string, UserID string) error
}

func (m Room) validate() error {
	return validation.ValidateStruct(&m,
		validation.Field(&m.ID, validation.Required),
	)
}

func NewService(repo Repository) Service {
	return service{repo}
}

func (s service) Get(ctx context.Context, id string) (Room, error) {
	room, err := s.repo.Get(ctx, id)
	if err != nil {
		return Room{}, err
	}

	return room, nil
}

func (s service) Create(ctx context.Context, room Room) (Room, error) {
	if err := room.validate(); err != nil {
		return Room{}, err
	}

	_, err := s.repo.Create(ctx, room)
	if err != nil {
		return Room{}, err
	}

	return room, nil
}

func (s service) AddUserToRoom(ctx context.Context, roomID string, userID string) error {
	_, err := s.repo.AddUser(ctx, roomID, userID)
	return err
}
