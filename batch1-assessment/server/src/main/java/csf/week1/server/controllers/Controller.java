package csf.week1.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import csf.week1.server.Services.MovieService;

@RestController
@RequestMapping(path="/api")
public class Controller {

    @Autowired
    MovieService movieSvc;


    @GetMapping(path="/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getMovies(@RequestParam String query){
        return movieSvc.searchReview(query);        
    }
    
}
