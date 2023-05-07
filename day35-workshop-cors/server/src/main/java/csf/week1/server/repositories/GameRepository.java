package csf.week1.server.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class GameRepository {
    
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<String> getGames(int limit, int offset){
        
        Query query = new Query();
        query.addCriteria(Criteria.where("name").regex(""));
        query.fields().exclude("_id").include("name");
        query.skip(offset).limit(limit);
        query.with(Sort.by(Sort.Direction.ASC, "name"));

        List<String> games = mongoTemplate.find(query, String.class,"games");

        return games;
    }
}
