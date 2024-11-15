export interface IShows {
  _id: string;
  title: string;
  description: string;
  type: string;
  genre: string;
  theatricalReleaseDate: string;
  ottReleaseDate: string;
  durationInMinutes: number;
  castAndCrew: { name: string; role: string }[];
  mainImage: string;
  bannerImage: string;
  trailer: string;
  episode: {
    name: string;
    content: string;
  }[];
  content: string;
  createdAt: string;
  updatedAt: string;
}
