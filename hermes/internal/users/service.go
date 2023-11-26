package users

import (
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepository interface {
	CreateUser(db *mongo.Database, user *User) error
}

type UserService struct {
	repo UserRepository
}

func NewUserService(repo UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) CreateUser(DB *mongo.Database, user *User) error {
	return s.repo.CreateUser(DB, user)
}
