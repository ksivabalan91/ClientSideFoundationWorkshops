package csf.week2.server.controllers;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import csf.week2.server.Utils;
import csf.week2.server.models.Post;
import csf.week2.server.repositories.PostRepository;
import jakarta.json.Json;
import jakarta.json.JsonObject;

@Controller
@RequestMapping(path="/api")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    private PostRepository postRepo;

    private static final String BASE64_PREFIX = "data:image/png;base64,";
 
    
    @PostMapping(path="/comment", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> post(@RequestPart MultipartFile picture, @RequestPart String comments) throws IOException{

        //! Using prepared statement
        Boolean status0 = postRepo.post(picture, comments);
        //! Using JDBC template (easier)
        Boolean status = postRepo.post2(picture, comments);
        
        return ResponseEntity.ok().body(status.toString());
    }

    @GetMapping(path = "/comment/{postId}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> get(@PathVariable String postId){

        Optional<Post> opPost = postRepo.findPostById(postId);
        // Optional<Post> opPost = postRepo.findPostById2(postId);
        Post p = opPost.get();
        String encodedString  = Base64.getEncoder().encodeToString(p.getPicture());

        JsonObject payload = Json.createObjectBuilder()
            .add("picture",BASE64_PREFIX+encodedString)
            .build();

        return ResponseEntity.status(HttpStatus.OK).body(payload.toString());
    }
    
}
