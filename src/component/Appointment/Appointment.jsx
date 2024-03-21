import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppointmentloggedUser } from '../../Action/appointmentAction';

const columns = [
	{
		name: 'Title',
		selector: row => row.title,
        sortable: true,
	},
	{
		name: 'Year',
		selector: row => row.year,
        sortable: true,
	},
];

const data = [
  	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
]

function Appointment() {
    const dispatch = useDispatch()
    const {appointments, loading} = useSelector(state => state.appointment)
    useEffect(() => {
        dispatch(getAllAppointmentloggedUser())
    },[dispatch])
	return (
		<DataTable
			columns={columns}
			data={appointments}
            pagination
            progressPending={loading}
            highlightOnHover
            pointerOnHover
            theme="solarized"
            className='w-75 mt-4 m-auto grey'
		/>
	);
};

export default Appointment