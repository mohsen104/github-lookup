export interface IRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  languageColor: string;
  html_url: string;
}

export interface IUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  languages: string[];
  repos: IRepo[];
}
