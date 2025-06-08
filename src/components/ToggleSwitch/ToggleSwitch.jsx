import React from 'react';
import "./ToggleSwitch.css"

const ToggleSwitch = ({ checked, onChange }) => {
    return (
    <div className='flex items-center gap-2.5 ' >
        <span className='text-[11px]  block text-nowrap'>پست‌های عکس دار</span>
        <label className="switch">
          <input type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          />
          <span className="slider"></span>
        </label>
    </div>
    );
}

export default ToggleSwitch;
