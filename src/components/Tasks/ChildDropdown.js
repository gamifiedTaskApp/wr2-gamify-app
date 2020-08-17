import React, {useState} from 'react';
import onClickOutside from 'react-onclickoutside';
import './tasks.css';

function ChildDropdown(){

    const [open, setOpen] = useState(false);
    const [children] = useState([]);
    const [title, setTitle] = useState('');
    const toggle = () => setOpen(!open);
    const listChildren = children.map((day) => 
        <li> 
            <button onClick={() => setTitle(day)}>               
            {day} 
            </button>
        </li>
    )
    ChildDropdown.handleClickOutside = () => setOpen(false);

    return(
    <div>
        <div 
        tabIndex={0} 
        onKeyPress={() => toggle(!open)} 
        onClick={() => toggle(!open)}>
            <div>
                <p>{title}</p>
            </div>
            <div>
                <p>{open ? 'Close' : 'Open'}</p>
            </div>
        </div>
        {open && (
            <ul>
                {listChildren}
            </ul>
        )}
    </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => ChildDropdown.handleClickOutside,
};

export default onClickOutside (ChildDropdown, clickOutsideConfig);