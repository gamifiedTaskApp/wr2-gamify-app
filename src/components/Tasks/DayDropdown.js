import React, {useState} from 'react';
import onClickOutside from 'react-onclickoutside';
import './tasks.css';

function DayDropdown(){

    let date = new Date();
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    let day = weekday[date.getDay()];
    const [open, setOpen] = useState(false);
    const [days] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    const [title, setTitle] = useState(day);
    const toggle = () => setOpen(!open);
    const listDays = days.map((day) => 
        <li className='dd-list'> 
            <button className='day-button' onClick={() => setTitle(day)}>               
            {day} 
            </button>
        </li>
    )
    DayDropdown.handleClickOutside = () => setOpen(false);

    return(
    <div classname='dd-wrapper'>
        <div 
        tabIndex={0} 
        className='dd-header'
        onKeyPress={() => toggle(!open)} 
        onClick={() => toggle(!open)}>
            <div className='dd-header__title'>
                <p className='dd-header__title--bold'>{title}</p>
            </div>
            <div className='dd-header__action'>
                <p>{open ? '' : '▾'}</p>
            </div>
        </div>
        {open && (
            <ul className='dd-list'>
                {listDays}
            </ul>
        )}
    </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => DayDropdown.handleClickOutside,
};

export default onClickOutside(DayDropdown, clickOutsideConfig);