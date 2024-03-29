export interface Basic {
    email: string;
    name: string;
    nickname: string;
    picture: string;
  }
  
  export interface Demographics {
    gender?: string;
    pronouns?: string;
    sexuality?: string;
    religion?: string;
    starsign?: string;
    dateOfBirth?: string;
    nationality?: string;
    languages?: string[];
  }
  
  export interface Personality {
    traits: string[];
    sleepPreference: string;
    humorType: string;
  }
  
  export interface Life {
    job?: string;
    company?: string;
    interests?: string[];
    education?: string;
    aspirations?: string[];
    politicalStances?: string[];
    challengesFaced?: string[];
  }
  
  export interface Additional {
    relyOnMeFor: string[];
    favoriteTraitsInFriend: string[];
  }
  
  export interface Profile {
    id?: string;
    object?: string;
    userId?: string;
    basic?: Basic;
    demographics?: Demographics;
    personality?: Personality;
    life?: Life;
    additional?: Additional;
  }