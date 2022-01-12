import React from 'react';
import {Card} from '@shopify/polaris';

export const UsersList = () => {

    const db = JSON.parse(localStorage.users || '[]');

    const createUserCard = (user) => {
        return (
            <div className='user-card'>
                <Card title="Customer">
                    <Card.Section>
                        <p>{user.name}</p>
                    </Card.Section>
                    <Card.Section title="Contact Information">
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                    </Card.Section>
                    <Card.Section title="Address">
                        <p onClick={clickAddressEvent} className='address'>{user.address}</p>
                        {/* <div><iframe width="90%" height="200" frameborder="0" scrolling="yes" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=cum&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe></div> */}
                    </Card.Section>
                </Card>
            </div>
        );
    }

    // show google maps address
    const clickAddressEvent = (event) => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${event.target.innerText}`);
    }

    const dataToRender = db.map(user => createUserCard(user));


    return(
        <div className='card-container'>
            {dataToRender}
        </div>
    )
}