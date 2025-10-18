export default interface RepositoryFile {
  name: string;
  path: string;
  type: "file" | "dir";
  html_url: string;
  size?: number;
}
