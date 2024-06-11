import React, { useState } from 'react';
import { Box, Divider, Grid, Paper, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SpaIcon from '@mui/icons-material/Spa';
import RealTimeChart from '../../components/Chart/RealTimeChart';
import useSSE from '../../hooks/useSSE';
import DevicePump from '../../components/DevicePump';
import DeviceStatus from '../../components/DeviceStatus';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import OpacityIcon from '@mui/icons-material/Opacity';
export default function Page_Dashboard() {
	const [value, setValue] = useState('1');
	const [bulbStatus] = ["ACTIVE"] //registerDeviceStatus('devices/bulb/sse');
	const [doorStatus] = ["INACTIVE"]; //registerDeviceStatus('devices/door/sse');
	const [pumperStatus] = ["INACTIVE"] //registerDeviceStatus('devices/pumper/sse');
	return (
		<>
			<Box
				sx={{
					fontSize: 50,
					fontWeight: 600,
					color: 'black',
					display: 'inline-flex',
					justifyContent: 'start',
				}}
			>
				Dashboard
			</Box>
			<Grid container spacing={5}>
				<Grid item xs={8}>
					<TabContext value={value}>
						<Box>
							<TabList
								aria-label='Tabs menu'
								onChange={(event, newValue) => {
									setValue(newValue);
								}}
								textColor='primary'
								indicatorColor='primary'
								sx={{
									'& .MuiTabs-indicator': {
										backgroundColor: 'black',
									},
								}}
							>
								<Tab
									label='Temperature'
									value='1'
									sx={{
										textTransform: 'none',
										fontSize: 26,
										marginRight: 2,
										fontWeight: 600,
										color: 'rgba(0, 0, 0, 0.85)',
										'&:hover': {
											color: 'rgba(190, 190, 190, 0.85)',
										},
										'&.Mui-selected': {
											color: 'black',
										},
									}}
									icon={
										<DeviceThermostatIcon fontSize='large' />
									}
									iconPosition='start'
								/>
								<Tab
									label='Humidity'
									value='2'
									sx={{
										textTransform: 'none',
										fontSize: 26,
										marginRight: 2,
										fontWeight: 600,
										color: 'rgba(0, 0, 0, 0.85)',
										'&:hover': {
											color: 'rgba(190, 190, 190, 0.85)',
										},
										'&.Mui-selected': {
											color: 'black',
										},
									}}
									icon={<WaterDropIcon fontSize='large' />}
									iconPosition='start'
								/>
								<Tab
									label='Soil Moisture'
									value='3'
									sx={{
										textTransform: 'none',
										fontSize: 26,
										marginRight: 2,
										fontWeight: 600,
										color: 'rgba(0, 0, 0, 0.85)',
										'&:hover': {
											color: 'rgba(190, 190, 190, 0.85)',
										},
										'&.Mui-selected': {
											color: 'black',
										},
									}}
									icon={<SpaIcon fontSize='large' />}
									iconPosition='start'
								/>
							</TabList>
							<Divider
								sx={{ borderColor: 'lightgray' }}
							></Divider>
						</Box>

						<TabPanel value='1'>
							<RealTimeChart
								uri='measurements/temperature/sse'
								label='Temperature'
							/>
						</TabPanel>
						<TabPanel value='2'>
							<RealTimeChart
								uri='measurements/humidity/sse'
								label='Humidity'
							/>
						</TabPanel>
						<TabPanel value='3'>
							<RealTimeChart
								uri='measurements/moisture/sse'
								label='Moisture'
							/>
						</TabPanel>
					</TabContext>
				</Grid>

				<Grid item xs={4}>
					<DeviceStatus
						sx={{ marginTop: '40px' }}
						iconComponent={<AgricultureIcon fontSize='large' />}
						data={{
							title: 'Fertilizer',
							value: bulbStatus,
						}}
					></DeviceStatus>
					<DeviceStatus
						sx={{ marginTop: '40px' }}
						iconComponent={<LocationOnIcon fontSize='large' />}
						data={{
							title: 'Area',
							value: doorStatus,
						}}
					></DeviceStatus>
					<DevicePump
						sx={{ marginTop: '40px' }}
						iconComponent={<OpacityIcon fontSize='large' />}
						data={{
							title: 'Pump',
							value: pumperStatus,
						}}
					></DevicePump>
				</Grid>
			</Grid>
		</>
	);
}
function registerDeviceStatus(url) {
	const [status, setStatus] = useState('UNDEFINED');
	if (
		!useSSE(url, (event) => {
			if (!event || !event.data.length) return;
			const status = Number(JSON.parse(event?.data)?.data);
			console.log(`Status: ${status}`);
			setStatus(status ? 'ON' : 'OFF');
		})
	) {
		console.log('Cannot track the device');
	}
	return [status, setStatus];
}
