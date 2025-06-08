import React from 'react';

const RadioButtons = ({order,setOrder}) => {
    return (
       
<div class="flex justify-center w-full px-2 py-1 bg-white border border-gray-300 text-[rgb(72,72,72)] rounded-2xl text-[12px]">
    <p className='me-1'>چینش براساس:</p>
    <div class="flex items-center me-1.5">
        <input id="inline-2-radio" type="radio" value="desc" name="inline-radio-group"
        checked={order === 'desc'}
        onChange={() => setOrder('desc')}
        class="w-2.5 h-2.5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1"/>
        <label for="inline-2-radio" class="ms-0.5  font-medium">جدید به قدیم</label>
    </div>

    <div class="flex items-center">
        <input id="inline-radio" type="radio" value="asc" name="inline-radio-group"
        checked={order === 'asc'}
        onChange={() => setOrder('asc')}
        class="w-2.5 h-2.5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1"/>
        <label for="inline-radio" class="ms-0.5  font-medium">قدیم به جدید</label>
    </div>
</div>

    );
}

export default RadioButtons;
