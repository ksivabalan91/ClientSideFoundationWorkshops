package csf.week1.server.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    private String display_title;
    private String mpaa_rating;
    private String byline;
    private String headline;
    private String summary_short;
    private String url;
    private String src;
    private Integer comment_count;
}
