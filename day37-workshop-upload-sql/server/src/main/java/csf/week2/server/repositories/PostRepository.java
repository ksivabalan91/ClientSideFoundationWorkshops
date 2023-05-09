package csf.week2.server.repositories;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;
import java.util.UUID;

import javax.sql.DataSource;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import csf.week2.server.models.Post;

@Repository
public class PostRepository extends BasicCrud {

    @Autowired
    private JdbcTemplate template;
    @Autowired
    private DataSource dataSource;

    //! upload file using PrepareStatement
    public Boolean post(MultipartFile picture, String comments) throws IOException{

        String name = picture.getName();
        String fileName = picture.getOriginalFilename();
        String mediaType = picture.getContentType();
        InputStream fileInputStream = picture.getInputStream();
        
        // generate UUID
        String id = UUID.randomUUID().toString().substring(0, 8);
        
        try {
            // 1. connect to database
            Connection con = dataSource.getConnection();
            System.out.println("database connection successfull");
            
            // 2. SQL statement
            //todo "insert into posts(post_id,comments,picture) values (?,?,?)"
            String SQL_INSERT_POST="insert into posts(post_id,comments,picture) values (?,?,?)";
            
            // 3. Create Prepared statement
            PreparedStatement ps = con.prepareStatement(SQL_INSERT_POST);
            
            // 4. Insert values into the prepared statement
            ps.setString(1, id);
            ps.setString(2, comments);
            ps.setBinaryStream(3, fileInputStream, picture.getSize());
            
            // 5. execute statement
            return ps.execute();
            
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    //! upload file using JDBC TEMPLATE
    public Boolean post2(MultipartFile picture, String comments) throws IOException{
        
        String name = picture.getName();
        String fileName = picture.getOriginalFilename();
        String mediaType = picture.getContentType();
        byte[] picBytes = IOUtils.toByteArray(picture.getInputStream());
        
        // generate UUID
        String id = UUID.randomUUID().toString().substring(0, 8);
        
        String SQL_INSERT_POST="insert into posts(post_id,comments,picture) values (?,?,?)";

        int rows = template.update(SQL_INSERT_POST,id,comments,picBytes);
        
        if(rows>0){
            return true;
        }
        
        return false;
    }

    public Optional<Post> findPostById(String postId){        
        
        Post post = findItemBy("*", "posts", "post_id", postId, Post.class).get(0);
        
        if(post!=null){
            return Optional.of(post);
        }
        
        return Optional.empty();
    }
    public Optional<Post> findPostById2(String postId){
         String SQL_GET_POST_BY_ID = "select * from posts where post_id=?";
        return template.query(
            SQL_GET_POST_BY_ID,
            (ResultSet rs)->{
                if(!rs.next())
                    return Optional.empty();
                final Post post = Post.populate(rs);
                return Optional.of(post);
            }
        , postId);
    
}
}
