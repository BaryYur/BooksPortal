import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const NewsItem = ({ title, newsImg, url, author }) => {
    return (
        <Card sx={{ maxWidth: 360 }} style={{ width: "286px" }} className="news-card">
            <a href={url} target="_blank">
                <CardMedia
                    component="img"
                    alt="books-news"
                    height="200"
                    image={newsImg}
                />
            </a>
            <CardContent>
                <Typography gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {author}
                </Typography>
            </CardContent>
            <CardActions>
                <a href={url} target="_blank">
                    <Button size="small">Learn More</Button>
                </a>
            </CardActions>
        </Card>
    );
}

export default NewsItem;