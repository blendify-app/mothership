package profiles

const ProfileObject string = "profile"

type Profile struct {
	ID           string       `json:"id,omitempty" bson:"_id"`
	Object       string       `json:"object" bson:"object"`
	UserID       string       `json:"user_id" bson:"user_id"`
	Basic        Basic        `json:"basic" bson:"basic"`
	Demographics Demographics `json:"demographics" bson:"demographics"`
	Personality  Personality  `json:"personality" bson:"personality"`
	Life         Life         `json:"life" bson:"life"`
	Additional   Additional   `json:"additional" bson:"additional"`
}

type Basic struct {
	Email    string `json:"email" bson:"email"`
	Name     string `json:"name" bson:"name"`
	Nickname string `json:"nickname" bson:"nickname"`
	Picture  string `json:"picture" bson:"picture"`
}

type Demographics struct {
	Gender      string   `json:"gender" bson:"gender"`
	Pronouns    string   `json:"pronouns" bson:"pronouns"`
	Sexuality   string   `json:"sexuality" bson:"sexuality"`
	Religion    string   `json:"religion" bson:"religion"`
	Starsign    string   `json:"starsign" bson:"starsign"`
	DateOfBirth string   `json:"dateOfBirth" bson:"dateOfBirth"` // Use time.Time for actual date handling
	Nationality string   `json:"nationality" bson:"nationality"`
	Languages   []string `json:"languages" bson:"languages"`
}

type Personality struct {
	Traits          []string `json:"traits" bson:"traits"`
	SleepPreference string   `json:"sleepPreference" bson:"sleepPreference"`
	HumorType       string   `json:"humorType" bson:"humorType"`
}

type Life struct {
	Job              string   `json:"job" bson:"job"`
	Company          string   `json:"company" bson:"company"`
	Interests        []string `json:"interests" bson:"interests"`
	Education        string   `json:"education" bson:"education"`
	Aspirations      []string `json:"aspirations" bson:"aspirations"`
	PoliticalStances []string `json:"politicalStances" bson:"politicalStances"`
	ChallengesFaced  []string `json:"challengesFaced" bson:"challengesFaced"`
}

type Additional struct {
	RelyOnMeFor            []string `json:"relyOnMeFor" bson:"relyOnMeFor"`
	FavoriteTraitsInFriend []string `json:"favoriteTraitsInFriend" bson:"favoriteTraitsInFriend"`
}
