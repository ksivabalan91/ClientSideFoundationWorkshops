package csf.week2.server.models;

import java.sql.ResultSet;
import java.sql.SQLException;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {

    private String postId;
    private String comments;
    private byte[] picture;


    public static Post populate(ResultSet rs) throws SQLException{
        final Post p = new Post();
        p.setPostId(rs.getString("post_id"));
        p.setComments(rs.getString("comments"));
        p.setPicture(rs.getBytes("picture"));
        return p;
    }
}    
    

