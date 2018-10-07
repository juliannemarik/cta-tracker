import React from 'react';
import './AllTrains.css';

const AllTrains = (props) => {
  const runningTrains = props.runningTrains;
  return (
    <table id="operatingTrains">
      <tbody>
        {Object.keys(runningTrains).map((trainColor, idx) => {
          return (
            <tr key={idx}>
              <th scope="row" id={trainColor}>
                {trainColor}
              </th>
              {runningTrains[trainColor].map((train, idx) => {
                return <td key={idx}>{train.rn}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AllTrains
