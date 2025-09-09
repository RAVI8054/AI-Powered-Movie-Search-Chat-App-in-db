 
 import MoviesModel from "../model/Movies.model.js";
 let data=[
  {
    "title": "Parasite",
    "year": 2019,
    "genre": "Thriller",
    "country": "South Korea",
    "rating": 8.6,
    "description": "A poor family schemes to become employed by a wealthy household."
  },
  {
    "title": "Inception",
    "year": 2010,
    "genre": "Sci-Fi",
    "country": "USA",
    "rating": 8.8,
    "description": "A thief who steals corporate secrets through dream-sharing technology."
  },
  {
    "title": "Amélie",
    "year": 2001,
    "genre": "Romantic Comedy",
    "country": "France",
    "rating": 8.3,
    "description": "A whimsical Parisian girl changes the lives of people around her."
  },
  {
    "title": "3 Idiots",
    "year": 2009,
    "genre": "Comedy-Drama",
    "country": "India",
    "rating": 8.4,
    "description": "Three engineering students navigate life, pressure, and friendship."
  },
  {
    "title": "Pan's Labyrinth",
    "year": 2006,
    "genre": "Fantasy",
    "country": "Spain",
    "rating": 8.2,
    "description": "A young girl discovers a mythical labyrinth during the Spanish Civil War."
  },
  {
    "title": "Spirited Away",
    "year": 2001,
    "genre": "Animation",
    "country": "Japan",
    "rating": 8.6,
    "description": "A girl enters a spirit world where her parents have been transformed."
  },
  {
    "title": "The Godfather",
    "year": 1972,
    "genre": "Crime",
    "country": "USA",
    "rating": 9.2,
    "description": "The aging patriarch of a mafia family transfers control to his son."
  },
  {
    "title": "City of God",
    "year": 2002,
    "genre": "Crime-Drama",
    "country": "Brazil",
    "rating": 8.6,
    "description": "Two boys take different paths in the slums of Rio de Janeiro."
  },
  {
    "title": "Your Name",
    "year": 2016,
    "genre": "Romance/Fantasy",
    "country": "Japan",
    "rating": 8.4,
    "description": "Two strangers mysteriously begin to switch bodies across time and space."
  },
  {
    "title": "Roma",
    "year": 2018,
    "genre": "Drama",
    "country": "Mexico",
    "rating": 7.7,
    "description": "A housekeeper navigates love and loss in 1970s Mexico City."
  },
  {
    "title": "Train to Busan",
    "year": 2016,
    "genre": "Horror",
    "country": "South Korea",
    "rating": 7.6,
    "description": "Passengers fight for survival on a train during a zombie outbreak."
  },
  {
    "title": "Slumdog Millionaire",
    "year": 2008,
    "genre": "Drama",
    "country": "UK/India",
    "rating": 8.0,
    "description": "An uneducated teen wins a quiz show, revealing a tough life story."
  },
  {
    "title": "The Intouchables",
    "year": 2011,
    "genre": "Biography",
    "country": "France",
    "rating": 8.5,
    "description": "An unlikely friendship between a disabled man and his caregiver."
  },
  {
    "title": "Crouching Tiger, Hidden Dragon",
    "year": 2000,
    "genre": "Action/Fantasy",
    "country": "China",
    "rating": 7.8,
    "description": "Two warriors pursue a stolen sword and face forbidden love."
  },
  {
    "title": "La La Land",
    "year": 2016,
    "genre": "Musical",
    "country": "USA",
    "rating": 8.0,
    "description": "An actress and a jazz musician fall in love while chasing dreams."
  },
  {
    "title": "The Lives of Others",
    "year": 2006,
    "genre": "Drama/Thriller",
    "country": "Germany",
    "rating": 8.4,
    "description": "A Stasi officer monitors a writer and becomes emotionally involved."
  },
  {
    "title": "Capernaum",
    "year": 2018,
    "genre": "Drama",
    "country": "Lebanon",
    "rating": 8.4,
    "description": "A 12-year-old boy sues his parents for bringing him into the world."
  },
  {
    "title": "The Secret in Their Eyes",
    "year": 2009,
    "genre": "Mystery",
    "country": "Argentina",
    "rating": 8.2,
    "description": "A retired legal counselor writes a novel to find closure on a case."
  },
  {
    "title": "Rashomon",
    "year": 1950,
    "genre": "Crime/Drama",
    "country": "Japan",
    "rating": 8.2,
    "description": "The same crime is told by different witnesses, all with contradictions."
  },
  {
    "title": "Oldboy",
    "year": 2003,
    "genre": "Mystery/Action",
    "country": "South Korea",
    "rating": 8.4,
    "description": "A man imprisoned for 15 years seeks vengeance and the truth."
  },
  {
    "title": "Cinema Paradiso",
    "year": 1988,
    "genre": "Drama",
    "country": "Italy",
    "rating": 8.5,
    "description": "A filmmaker recalls his childhood love for cinema and friendship."
  },
  {
    "title": "The Hunt",
    "year": 2012,
    "genre": "Drama",
    "country": "Denmark",
    "rating": 8.3,
    "description": "A man’s life is ruined after being falsely accused of child abuse."
  },
  {
    "title": "The Great Beauty",
    "year": 2013,
    "genre": "Drama",
    "country": "Italy",
    "rating": 7.7,
    "description": "A writer reflects on love and regret in the grand beauty of Rome."
  },
  {
    "title": "The Man Who Knew Infinity",
    "year": 2015,
    "genre": "Biography",
    "country": "UK/India",
    "rating": 7.2,
    "description": "The story of Indian math genius Srinivasa Ramanujan and his work in Cambridge."
  },
  {
    "title": "The Salesman",
    "year": 2016,
    "genre": "Drama/Thriller",
    "country": "Iran",
    "rating": 7.8,
    "description": "An Iranian couple’s life is disrupted after a traumatic event."
  },
  {
    "title": "The Handmaiden",
    "year": 2016,
    "genre": "Thriller",
    "country": "South Korea",
    "rating": 8.1,
    "description": "A woman is hired as a handmaiden, but secrets unfold in a twisted plot."
  },
  {
    "title": "Portrait of a Lady on Fire",
    "year": 2019,
    "genre": "Romance",
    "country": "France",
    "rating": 8.1,
    "description": "An artist falls in love with the woman she’s been hired to paint."
  },
  {
    "title": "A Separation",
    "year": 2011,
    "genre": "Drama",
    "country": "Iran",
    "rating": 8.3,
    "description": "A couple’s divorce gets complicated with issues of class and religion."
  },
  {
    "title": "Incendies",
    "year": 2010,
    "genre": "War/Drama",
    "country": "Canada",
    "rating": 8.3,
    "description": "Twins uncover their mother’s tragic past in the Middle East."
  },
  {
    "title": "Wadjda",
    "year": 2012,
    "genre": "Drama",
    "country": "Saudi Arabia",
    "rating": 7.5,
    "description": "A girl in Saudi Arabia dreams of owning and riding a bicycle."
  }
]

export default async function seedDB() {
    await MoviesModel.insertMany(data);
    console.log("DB seeded")
}
