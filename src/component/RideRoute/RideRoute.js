import React from 'react';

const RideRoute = (props) => {
    const {bill,person} = props.data;
    return (
        <div>
          {bill} {person}
        </div>
    );
};

export default RideRoute;