import axois from 'axios'

function handleBungieResponse({data}) {
    const { ErrorCode, Message } = data;
    if (ErrorCode !== 1) {
        throw new Error(Message);
    }

    return data.Response;
}

export default function(authorization, apiKey, membershipType, fakeMembershipID) {

    const bungieRequest = axois.create({
        baseURL: 'http://bungie.net/Platform',
        headers: {
            'X-API-Key': apiKey,
            Authorization: `Bearer ${authorization.access_token}`,
        },
        withCredentials: true
    });

    const service = {

        getMembershipById(fakeMembershipID) {
            return bungieRequest
                .get(`/User/GetMembershipsDataById/${fakeMembershipID || authorization.membership_id}/${254}/`)
                .then(handleBungieResponse);
            },
        
        getAccountCharacters(destinyMembershipID) {
            return bungieRequest
                .get(`/Destiny2/${membershipType}/Profile/${destinyMembershipID}/?components=200&definitions`)
                .then(handleBungieResponse);
            },
    }
}