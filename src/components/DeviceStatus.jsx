import React, {useState} from 'react';
import { Box, Grid, Paper, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function DeviceStatus(props) {
	const [page, setPage] = useState(1);

	const handleClick = () => {
        // Handle click event here
        // console.log('Icon clicked!');
		alert("CLICKED")
    };

	const handleNext = () => {
		setPage(prev => Math.min(prev + 1, 3)); // Limit to 3 pages
	};

	const handlePrev = () => {
		setPage(prev => Math.max(prev - 1, 1)); // Limit to 1 page
	};

	return (
		<Grid item xs={props.xs || 12} sx={props.sx}>
			<Paper
				sx={{
					boxShadow: 10,
					borderRadius: 3,
					height: '100%',
					width: '100%',
					padding: 2,
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<h1>{props.data.title} {page}</h1>
					<h4>Current status: <br></br>{props.data.value}</h4>
					{/* <h4>{props.data.value}</h4> */}
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						flexDirection: 'column'
					}}
				>
					{/* <div onClick={handleClick} style={{ cursor: 'pointer' }}>
						{props.iconComponent}
					</div> */}
					<div>
						{props.iconComponent}
					</div>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							flexDirection: 'row'
						}}
					>
						<IconButton onClick={handlePrev} disabled={page === 1}>
							<ChevronLeftIcon />
						</IconButton>
						<IconButton onClick={handleNext} disabled={page === 3}>
							<ChevronRightIcon />
						</IconButton>
					</Box>
				</Box>
			</Paper>
		</Grid>
	);
}
