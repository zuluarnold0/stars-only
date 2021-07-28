//packages
import React from 'react';

//local
import FollowingsCard from './followings_card/FollowingsCard';

//map following users to card
const FollowingsList = ({ followings }) => {
    return followings.map((user) => <FollowingsCard key={user._id} user={user} />);
}

export default FollowingsList;