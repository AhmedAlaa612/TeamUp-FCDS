class User {
  username: string;
  email: string;
  phone_number: string;
  linkedin_link: string;
  github_link: string;
  bio: string;
  img: string;
  constructor(
    name: string,
    email: string,
    phone_number: string,
    linkedin_link: string,
    github_link: string,
    bio: string,
    img: string
  ) {
    this.username = name;
    this.email = email;
    this.phone_number = phone_number;
    this.linkedin_link = linkedin_link;
    this.github_link = github_link;
    this.bio = bio;
    this.img = img;
  }
}
export type { User };
