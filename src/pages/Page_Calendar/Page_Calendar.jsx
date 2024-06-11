import { Add, Person } from '@mui/icons-material'
import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@mui/material'
import moment from 'moment'
import { EventCalendar } from 'react-mui-event-calendar'
import React, { useState } from 'react';
import AddModal from '../../components/Modal/Add'

const emails = ['username@gmail.com', 'user02@gmail.com']
const test = {'asdd': 123, "dddd": "ddd"}
// const test = "123"

function Page_Calendar() {
    const data = [
        {
        date: new Date(),
        title: 'First',
        popupContent: (
            <>
            <List sx={{ pt: 0 }}>
                {emails.map((email) => (
                <ListItem button key={email}>
                    <ListItemAvatar>
                    <Avatar>
                        <Person />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={email} />
                </ListItem>
                ))}

                <ListItem autoFocus button>
                <ListItemAvatar>
                    <Avatar>
                    <Add />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Add account' />
                </ListItem>
            </List>
            </>
        ),
        id: '1',
    },
    {
        date: moment('2024-06-01'),
        title: "Use Google's location service?",
        popupContent: (
            <>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button>Disagree</Button>
                <Button>Agree</Button>
            </DialogActions>
            </>
        ),
        id: '2',
    },
    {
        date: moment().subtract(3, 'days'),
        title: 'Third',
        popupContent: (
        <>
            <DialogContent>
            <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
            </DialogContentText>
            <TextField
                autoFocus
                margin='dense'
                id='name'
                label='Email Address'
                type='email'
                fullWidth
                variant='standard'
            />
            </DialogContent>
            <DialogActions>
            <Button>Cancel</Button>
            <Button>Subscribe</Button>
            </DialogActions>
        </>
      ),
      color: '#000',
      id: '3',
    },
    {
      date: new Date(),
      title: 'Fourth',
      popupContent: (
        <>
          <DialogContent>
            <DialogContentText>
              {[...new Array(50)]
                .map(
                  () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                )
                .join('\n')}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button>Cancel</Button>
        <Button>Subscribe</Button>
        </DialogActions>
    </>
    ),
    color: '#ffe100',
    id: '4',
},
{
    date: moment().subtract(10, 'days'),
    title: 'Fourth',
    popupContent: (
    <>
        <DialogContent>
        <DialogContentText>
            {[...new Array(50)]
            .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
                        Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button>Cancel</Button>
        <Button>Subscribe</Button>
        </DialogActions>
    </>
    ),
    color: '#ffe100',
    id: '4',
},
{
    date: moment().subtract(25, 'days'),
    title: 'Fourth',
    popupContent: (
    <>
        <DialogContent>
        <DialogContentText>
            {typeof test === 'object' ? JSON.stringify(test, null, 2) : test}
            {/* {[...new Array(50)]
            .map(
                () => `${test}`
            )
            .join('\n')} */}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button>Cancel</Button>
        <Button>Subscribe</Button>
        </DialogActions>
    </>
    ),
    id: '4',
},
{
    date: new Date(),
    title: 'Fourth',
    popupContent: (
    <>
        <DialogContent>
        <DialogContentText>
            {[...new Array(50)]
            .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button>Cancel</Button>
        <Button>Subscribe</Button>
        </DialogActions>
    </>
    ),
    color: '#ffe100',
    id: '4',
},
{
    date: moment().add(5, 'days'),
    title: 'Fourth',
    popupContent: (
    <>
        <DialogContent>
        <DialogContentText>
            {[...new Array(50)]
            .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button>Cancel</Button>
        <Button>Subscribe</Button>
        </DialogActions>
    </>
    ),
    color: '#ffe100',
    id: '4',
},
{
    date: new Date(),
    title: 'Fourth',
    popupContent: (
    <>
        <DialogContent>
        <DialogContentText>
            {[...new Array(50)]
            .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button>Cancel</Button>
        <Button>Subscribe</Button>
        </DialogActions>
    </>
    ),
    color: '#ffe100',
    id: '4',
},
{
    date: moment().subtract(2, 'days'),
    title: 'Fourth',
    popupContent: (
    <>
        <DialogContent>
        <DialogContentText>
            {[...new Array(50)]
            .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button>Cancel</Button>
        <Button>Subscribe</Button>
        </DialogActions>
    </>
    ),
    color: '#ffe100',
    id: '4',
},
{
    date: moment().add(30, 'days'),
    title: 'Fourth',
    popupContent: (
    <>
        <DialogContent>
        <DialogContentText>
            {[...new Array(50)]
            .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button>Cancel</Button>
        <Button>Subscribe</Button>
        </DialogActions>
    </>
    ),
    color: '#ffe100',
    id: '4',
},
    ]

    const [dataSource, setDataSource] = useState(data)
    const [open, setOpen] = useState(false)
    const [events, setEvents] = useState([])

    return (
    <div
        style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0',
        }}
    >
        <AddModal open={open} setOpen={setOpen} events={events} setEvents={setEvents}/>
        <EventCalendar
        dataSource={events}
        pallet={{ primary: '#32d3a2', secondary: '#2343d3' }}
        onDataChange={(newEvents) => setDataSource(newEvents)}
        />
    </div>
    )
}

export default Page_Calendar