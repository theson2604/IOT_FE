import * as React from 'react';
import { Select, Box, Button, Typography, Modal, MenuItem, FormControl, Grid, InputLabel, Tooltip, FormControlLabel, Checkbox, IconButton, DialogContent, DialogContentText } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { VolumeDown } from '@mui/icons-material';
import { format } from 'date-fns';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px',
};

const formControlStyle = {
    width: '100%',
    marginTop: 2,
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 2,
};

const list_area = ['Area 1', 'Area 2', 'Area 3']

const list_trigger = ['Instant', 'Interval', 'Repeat']

function getDaysArray(start, end) {
    console.log("START: ", start, "END: ", end)

    let arr = [];
    let current = start.clone();
  
    while (current.isBefore(end) || current.isSame(end, 'day')) {
        arr.push(current.format('YYYY-MM-DD'));
        current = current.add(1, 'day');
    }
  
    return arr;
  }

export default function AddModal({ open, setOpen, events, setEvents }) {
    const [volume, setVolume] = React.useState(["", "", ""])
    const [time, setTime] = React.useState(null)
    const [timeout, setTimeout] = React.useState(null)
    const [option, setOption] = React.useState(null)
    const [endDate, setEndDate] = React.useState(null)
    const [days, setDays] = React.useState([dayjs().format('YYYY-MM-DD')])

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setVolume(["", "", ""]);
        setTime(null);
        setDays([dayjs().format('YYYY-MM-DD')]);
        setTimeout(null);
        setEndDate(null);
        setOption(null);
        setOpen(false);
    }

    const handleVolumeChange = (e, index) => {
        const newVolume = [...volume];
        newVolume[index] = e.target.value;
        setVolume(newVolume);
    };

    const handleTime = (newTime) => {
        setTime(newTime)
    }

    const handleTimeout = () => {
        const hours = timeout.hour();
        const minutes = timeout.minute();
        const seconds = timeout.second();

        // Format the time as hh:mm:ss
        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        console.log("TIMEOUT: ", formattedTime)
        return formattedTime;
        
    }
    
    const handleOption = (e) => {
        setOption(e.target.value)
    }

    const handleEndDate = (newValue) => {
        setEndDate(newValue);
        if (newValue) {
        const new_days = getDaysArray(dayjs(), dayjs(newValue));
        setDays(new_days);
        }
    }

    const handleSave = () => {
        const new_events = handleEvents()
        console.log(new_events)
        setEvents(events.concat(new_events))
        handleClose();
    };

    const formatContent = (content) => {
        if (typeof content !== 'object' || content === null) {
            return content;
        }
    
        return Object.entries(content)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join('. ');
    };

    const handleEvents = () => {
        let new_events = []
        const content = {
            Volume: `[${formatContent({
                Area1: volume[0],
                Area2: volume[1],
                Area3: volume[2],
            })}]`,
            StartTime: (time !== null)? time : dayjs().format('ddd, DD MMM YYYY HH:mm:ss [GMT]'),
            Timeout: handleTimeout(),
            Option: option
        }
        for (let index = 0; index < days.length; index++) {
            const new_event = {
                date: days[index],
                title: "Irrigation Schedule",
                popupContent: (
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            {/* {typeof content === 'object' ? JSON.stringify(content, null, 2) : content} */}
                            {formatContent(content)}
                        </DialogContentText>
                    </DialogContent>
                ),
                id: index,
            }
            new_events.push(new_event)
        }
        return new_events
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button
            sx={{
            marginRight: '3.5rem',
            marginBottom: '0.5rem',
            color: 'white',
            backgroundColor: '#32d3a2',
            border: '1px solid green',
            '&:hover': {
                backgroundColor: 'darkgreen',
            },
            }}
            onClick={handleOpen}
        >
            Add Scheduler
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    Add Scheduler
                </Typography>
                {list_area.map((area, index) => (
                    <FormControl key={index} sx={formControlStyle}>
                        <InputLabel id="select-sensor-label">{area}</InputLabel>
                        <Select
                            labelId="select-sensor-label"
                            id="select-sensor"
                            value={volume[index]}
                            onChange={(e) => handleVolumeChange(e, index)}
                            label={area}
                            renderValue={(select) => select}
                            // style = {{marginBottom: '0.2rem'}}
                        >
                            <MenuItem value={"No Irrigation"}>No Irrigation</MenuItem>
                            <MenuItem value={"Low"}>Low</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"High"}>High</MenuItem>
                        </Select>
                    </FormControl>
                ))}
                
                {option !== '' ? (
                    <>
                        <Grid item xs={2}></Grid>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                views={['hours', 'minutes', 'seconds']}
                                format="HH:mm:ss"
                                label="Select Timeout"

                                value={timeout}
                                ampm={false}
                                sx={{ width: '100%', height: 50, marginTop: '1rem' }}
                                onChange={(newValue) => setTimeout(newValue)}
                                slotProps={{
                                    textField: {
                                        InputProps: {
                                            style: {
                                                height: 50
                                            }
                                        }
                                    }
                                }}
                            />

                        </LocalizationProvider>
                        <Grid item xs={10} sx={{ marginTop: 0, display: 'flex', justifyContent: 'center' }}>
                            {option === 'Interval' && (

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        views={['hours', 'minutes', 'seconds']}
                                        format="HH:mm:ss    "
                                        label="Select Interval"

                                        value={time}
                                        ampm={false}
                                        sx={{ width: '100%', height: 50, marginTop: '1rem' }}
                                        onChange={(newValue) => handleTime(newValue)}
                                        slotProps={{
                                            textField: {
                                                InputProps: {
                                                    style: {
                                                        height: 50
                                                    }
                                                }
                                            }
                                        }}
                                    />

                                </LocalizationProvider>

                            )}
                            {option === 'Repeat' && (

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        views={['hours', 'minutes', 'seconds']}
                                        label="Select Time"
                                        ampm={true}
                                        value={time}
                                        sx={{ width: '100%', height: 56, marginTop: '1rem' }}
                                        onChange={(newValue) => handleTime(newValue)}
                                        slotProps={{
                                            textField: {
                                                InputProps: {
                                                    style: {
                                                        height: 56
                                                    }
                                                }
                                            }
                                        }}
                                    />

                                </LocalizationProvider>
                            )}
                            {option === 'Repeat' && (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                    label="Select End Date"
                                    value={endDate}
                                    onChange={(newValue) => {
                                        handleEndDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    sx={{ width: '100%', marginTop: '1rem' }}
                                    format="YYYY-MM-DD"
                                    />
                                </LocalizationProvider>
                            )}
                        </Grid>
                    </>
                ) : null}
                <Grid item xs={9.75} sx={{ display: 'flex', flexDirection: 'row' }}>
                    {list_trigger.map((trigger, index) => (
                        <Grid key={index} item container spacing={1}  >
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name='trigger'
                                            checked={option === trigger}
                                            onChange={handleOption}
                                            value={trigger}
                                        />
                                    }
                                    label={trigger}

                                />
                                
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={buttonContainerStyle}>
                    <Button onClick={handleClose} sx={{ marginRight: 1 }}>Cancel</Button>
                    <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
                </Box>
            </Box>
        </Modal>
        </div>
    );
}
