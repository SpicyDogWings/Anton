interface Plates {
  name: string;
  description: string;
  price: number;
  score: number;
  restaurant: string;
  user: string;
}

type ScoreRange = 1 | 2 | 3 | 4 | 5; 

interface Plates {
  name: string;
  description: string;
  price: number;
  score: ScoreRange; 
  restaurant: string;
  user: string;
}

export default Plates;
