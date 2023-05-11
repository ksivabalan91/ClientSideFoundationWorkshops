package csf.week1.server.Services;

import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import csf.week1.server.Utils;
import csf.week1.server.models.Review;
import csf.week1.server.repositories.MovieRepository;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class MovieService {    
    
    @Autowired
    private MovieRepository movieRepo;

    @Value("${NYTIMES_API_KEY}")
    private String apiKey;
    
    private final String URL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";    

    public ResponseEntity<String> searchReview(String query){

        String uri = UriComponentsBuilder
        .fromUriString(URL)
        .queryParam("query", query)
        .queryParam("api-key", apiKey)
        .toUriString();

        // System.out.println(">>>URI:"+uri);
    
        RequestEntity<Void> req =  RequestEntity
            .get(uri)
            .accept(MediaType.APPLICATION_JSON)
            .build();

        RestTemplate template = new RestTemplate();

        ResponseEntity<String> resp = template.exchange(req, String.class);

        String payload = resp.getBody();
        // System.out.println("payload:>> "+payload+"\n");
        
        JsonReader jsonReader = Json.createReader(new StringReader(payload));
        JsonObject jsonObject = jsonReader.readObject();
        // System.out.println("jsonObject:>> "+jsonObject+"\n");
        JsonArray jsonArray = jsonObject.getJsonArray("results");
        // System.out.println("jsonArray:>> "+jsonArray+"\n");

        List<Review> reviewList = new LinkedList<>();

        for(int i =0;i<jsonArray.size();i++){
            try{
                String display_title = jsonArray.getJsonObject(i).getString("display_title");
                String mpaa_rating = jsonArray.getJsonObject(i).getString("mpaa_rating");
                String byline = jsonArray.getJsonObject(i).getString("byline");
                String headline = jsonArray.getJsonObject(i).getString("headline");
                String summary_short = jsonArray.getJsonObject(i).getString("summary_short");
                String url = jsonArray.getJsonObject(i).getJsonObject("link").getString("url");
                String src = jsonArray.getJsonObject(i).getJsonObject("multimedia").getString("src");
                Integer comment_count = movieRepo.countComments(display_title);

                Review review = new Review(display_title, mpaa_rating, byline, headline, summary_short, url, src,comment_count);
                // System.out.println(">>> REVIEW "+i+" "+ review.toString());
                reviewList.add(review);
            }catch(Exception ex){continue;}
        }

        // System.out.println(reviewList);
        JsonArray json = Utils.toJsonArray(reviewList);
        
        return ResponseEntity.status(HttpStatus.OK).body(json.toString());  
        

    }
    
}
