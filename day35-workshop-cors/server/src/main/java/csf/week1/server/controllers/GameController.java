package csf.week1.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import csf.week1.server.repositories.GameRepository;

@RestController
@RequestMapping(path="/api")
public class GameController {

    @Autowired
    private GameRepository gameRepo;

    @GetMapping(path="/games", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getGames(@RequestParam int offset,@RequestParam int limit){

        List<String> docs = gameRepo.getGames(limit, offset);

        return ResponseEntity.status(HttpStatus.OK).body(docs.toString());
    }
    
}
