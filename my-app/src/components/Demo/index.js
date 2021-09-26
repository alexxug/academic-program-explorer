import React from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios'

export default function index() {
const handleClick = (e) =>{
    axios.post('https://academic-program.herokuapp.com/api/v1/course', {
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

	return (
		<div>
		    <Button variant="contained" onClick={handleClick}>Give an Action</Button>
		</div>
	)
}
