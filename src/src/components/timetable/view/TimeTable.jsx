import React from 'react'
import Data from './Data';
import './style.css'

export default function TimeTable() {
    // const check = () => {
    //     console.log("hi");
    //     var arr = [];
    //     for (let i = 1; i < 11; i++) {
    //         arr.push(<Data row={i}/>);
            
    //     }
    //     return <>{arr}</>;
    // }
  return (
    <div>
        
        <table id='timetable' key={'timetable'}>
            <thead>
                <tr>
                    <th style={{width: "60px"}}></th>
                    <th>Thứ 2</th>
                    <th>Thứ 3</th>
                    <th>Thứ 4</th>
                    <th>Thứ 5</th>
                    <th>Thứ 6</th>
                    <th>Thứ 7</th>
                </tr>
            </thead>
            <tbody>
                <Data row={1}/>
                <Data row={2}/>
                <Data row={3}/>
                <Data row={4}/>
                <Data row={5}/>
                <Data row={6}/>
                <Data row={7}/>
                <Data row={8}/>
                <Data row={9}/>
                <Data row={10}/>
                {/* {check} */}
            </tbody>
            <tfoot>

            </tfoot>
        </table>
    </div>
  )
}
