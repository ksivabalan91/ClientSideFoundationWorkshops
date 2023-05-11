package csf.week1.server.repositories;

import java.io.StringReader;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Repository
public class MovieRepository {

    @Autowired
    private MongoTemplate template;


    /*db.comments.aggregate([
        {$match: { display_title: "Shazam! Fury of the Gods" }},
        {$project: { comment_count : { size: "$comments" },display_title : 1,_id : 0}}
        ])      
    */
    public int countComments(String movie){

        Integer commentCount = 0;
        
        MatchOperation match = Aggregation.match(Criteria.where("display_title").is(movie));
        ProjectionOperation project = Aggregation.project()
            .and("comments").size().as("comment_count")
            .andExclude("_id");
        Aggregation pipeline = Aggregation.newAggregation(match, project);

        AggregationResults<Document> results = template.aggregate(pipeline, "comments", Document.class);
        
            for(Document d: results){
                JsonReader jsonReader = Json.createReader(new StringReader(d.toJson()));
                JsonObject jsonObject = jsonReader.readObject();
                
                if(jsonObject.containsKey("comment_count")){
                    return jsonObject.getInt("comment_count");
                }
            }
            
        return commentCount;
    }

    
}
