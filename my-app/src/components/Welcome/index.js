import React, { useEffect, useState } from "react";
import { Breadcrumbs, Link, Typography, Button, ButtonGroup, Grid, Modal, Box } from '@material-ui/core';
import axios from 'axios';
import './../../mock/index.js';
import { ClassNames } from "@emotion/react";
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

export default function Index() {
	const [open, setOpen] = React.useState(false);
	const [Conversion, setConversion] = React.useState(['S1,S2', 'S1'])
	const [Core, setCore] = React.useState(['S1,S2', 'S1'])
	const [Optional, setOptional] = React.useState(['S1,S2', 'S1'])
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const [columns, setcolumns] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			axios
				.get('/api/list')
				.then(function (result) {
					try {
						let changecolumns = Object.values(result.data.columns);
						let list = [];
						let showlist = changecolumns.filter((ele) => {
							return ele.id.indexOf('year-1') !== -1
						})
						let showlist2 = changecolumns.filter((ele) => {
							return ele.id.indexOf('year-2') !== -1
						})
						showlist[0].taskIds = [];
						list.push({
							'title': 'year1',
							'data': showlist
						})
						list.push({
							'title': 'year2',
							'data': showlist2
						})
						console.log(list)
						setcolumns(list);
					} catch {
						fetchData()
					}

				})
				.catch(function (error) {
					console.log(error)
				})
		};

		fetchData();
	}, [])

	return (
		<div id="page">
			<Breadcrumbs aria-label="breadcrumb">
				<Link underline="hover" color="inherit" href="/">
					Home
				</Link>
				<Link
					underline="hover"
					color="inherit"
					href="/"
				>
					Select a Course
				</Link>
				<Typography color="text.primary">Create Study Plan</Typography>
			</Breadcrumbs>
			<h1>
				2345 Masters of Information Technology(2021)&nbsp;
				<Button variant="contained" className="fr">DOWNLOAD STUDY PLAN</Button>

				<Button variant="contained" className="fr">UPLOAD STUDY PLAN</Button>&nbsp;
			</h1>
			<ButtonGroup variant="contained outlined button group" size="small" aria-label="small  button group">
				<Button onClick={handleOpen}>Sample Study Plan 1</Button>
				<Button>Sample Study Plan 2</Button>
			</ButtonGroup>
			{columns.map((ele, i) => {
				return (
					<div className="container" key={i}>
						<h2>{ele.title}</h2>
						{
							ele.data.map((dom, m) => {
								return (
									<div className="conbox" key={m}>
										<p>{dom.title}</p>
										<div className="line">
											{
												dom.taskIds.map((data, c) => {
													return (
														<div key={c} className={`${data.color} con fl`}>
															Unit<br />
															{data.text}
														</div>
													)
												})
											}

										</div>
									</div>
								)
							})
						}
					</div>
				)
			})}
			<Grid container spacing={2} className="listbox">
				<Grid item xs={3} className="box">
					<div className="conbox">
						<p className="tit">Conversion</p>
						{
							Conversion.map((ele, i) => {
								return (
									<div className="con" key={i}>
										Unit<br />
										{ele}
									</div>
								)
							})
						}
					</div>
				</Grid>
				<Grid item xs={3} className="box">
					<div className="conbox"><p className="tit">Core</p>
						{
							Core.map((ele, i) => {
								return (
									<div className="con" key={i}>
										Unit<br />
										{ele}
									</div>
								)
							})
						}
					</div>

				</Grid>
				<Grid item xs={3} className="box">
					<div className="conbox">
						<p className="tit">Optional</p>
						{
							Optional.map((ele, i) => {
								return (
									<div className="con" key={i}>
										Unit<br />
										{ele}
									</div>
								)
							})
						}
					</div>

				</Grid>
				<Grid item xs={3} className="box">

				</Grid>
			</Grid>
			{/* model */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box sx={{ ...style, width: 800 }}>
					{/* <h2 id="parent-modal-title"></h2> */}
					<p id="parent-modal-description">
						Are you sure you want to load the study plan?
					</p>
					<p className='shadowbtn'>
						<Button variant="outlined" onClick={() => {
							handleClose()
							setConversion([])
							setCore([])
							setOptional([])
							let datas = columns;
							console.log(datas);
							if (datas.length !== 0) {
								datas[0].data[0].taskIds.push({
									'color': 'b1',
									'text': 'S1'
								})
								datas[0].data[0].taskIds.push({
									'color': 'b2',
									'text': 'S1'
								})
								datas[0].data[1].taskIds.push({
									'color': 'b2',
									'text': 'S1,S2'
								})
								datas[1].data[0].taskIds.push({
									'color': 'b1',
									'text': 'S1'
								})
								datas[1].data[0].taskIds.push({
									'color': 'b3',
									'text': 'S1'
								})
								datas[1].data[1].taskIds.push({
									'color': 'b3',
									'text': 'S1,S2'
								})
								datas[1].data[1].taskIds.push({
									'color': 'b1',
									'text': 'S1,S2'
								})
							}
						}} className="fr">OK</Button>
						<Button variant="contained" onClick={handleClose} className="fr">cancel</Button>

					</p>
				</Box>
			</Modal>
		</div >
	)
}
