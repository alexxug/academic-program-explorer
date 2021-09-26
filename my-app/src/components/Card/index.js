import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import { Button, CardActionArea, CardActions } from '@mui/material';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';


export default function MultiActionAreaCard({ unitCode, title, isDragging, forwardRef, ...props }) {
  return (
    <ListItem {...props.dragHandleProps} ref={forwardRef} {...props} ContainerComponent="div" sx={{ maxWidth: 500, backgroundColor: isDragging ? 'lightgreen' : "inherit" }} >
      {/* <Card {...props.dragHandleProps} ref={forwardRef} {...props} ContainerComponent="div" sx={{ maxWidth: 500, backgroundColor: isDragging ? 'lightgreen' : "inherit" }}> */}
      {/* <CardActionArea> */}

      {/* <CardContent > */}
      <Typography gutterBottom align='center' variant="h5" component="div">
        {/* <span {...dragHandleProps}>{unitCode}</span> */}
        {unitCode}
      </Typography>
      <Typography variant="body1" align='center' color="text.secondary">
        {title}
      </Typography>
      {/* </CardContent> */}
      {/* </CardActionArea> */}
      {/* </Card> */}
    </ListItem>
  );
}
