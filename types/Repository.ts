export default interface Repository {
  id: number;
  description: string | null;
  language: string | null;
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  private: boolean;
  homepage: string;
  html_url: string;
  size: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}
