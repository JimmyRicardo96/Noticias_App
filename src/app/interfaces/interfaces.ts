export interface RespuestaTopHeadlines {
    status: string;
    totalResults: number;
    articles: Article[];
  }
  // eslint-disable-next-line no-trailing-spaces
  
  export interface Article {
    source: Source;
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content?: string;
  }

  export interface Source {
    id?: string;
    name: string;
  }
  // eslint-disable-next-line no-trailing-spaces
  
