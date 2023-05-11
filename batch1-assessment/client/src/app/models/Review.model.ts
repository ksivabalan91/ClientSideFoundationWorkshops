export class Review{
    constructor(
        public display_title: string,
        public mpaa_rating: string,
        public byline: string,
        public headline: string,
        public summary_short: string,
        public url: string,
        public src: string,
        public comment_count:number
    ){}
}