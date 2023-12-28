export type TMember = {avatar_url: string, id: number, login: string};
export type TDetailedMember = TMember & {
    name: string,
    company: string,
    location: string,
    public_repos: number,
    public_gists: number,
    followers: number,
    following: number
}