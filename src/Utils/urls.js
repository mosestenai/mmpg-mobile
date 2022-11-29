import React from "react";


const base_url = "https://adminmmpg.eazistey.co.ke/API_WEB_HOOKS/";

//user Create account url
export const Registeruserurl = base_url + "Common/register.php";

//user login account url
export const Loginuserurl = base_url + "Common/login.php?5$jj8mmpg=hh";

//user submitplan url
export const Submitplanuserurl = base_url + "Common/submitplan.php";
//user change password url
export const Changepasswordurl = base_url + "Common/change_password.php";

//user get dashboard details
export const Getdashboarddetailsurl = base_url + "Artists/getdashboarddetails.php";

//artist or producer fetch artist information url
export const Getartistdetailsurl = base_url + "Artists/getartistdetails.php";

//post a song url
export const Postsongurl = base_url + "Artists/post_song_api.php";

//upload a song url
export const Uploadsongurl = base_url + "upload_song_api.php";
//upload a song url
export const Uploadreleasecoverimageurl = base_url + "upload_coverimage_api.php";

//upload profile pic api
export const Uploadprofilepicurl = base_url + "upload_dp.php?id=";

//upload profile pic api
export const Fetchtracksurl = base_url + "Musics/fetch_musics_api.php";

//Get artists data
export const Getartistsdataurl = base_url + "Artists/get_artist_data.php";
//send message url
export const Sendmessageurl = base_url + "Artists/post_message.php";

//Make bespoke request
export const Makebespokerequesturl = base_url + "Artists/make_bespoke_request.php";

//Make funding request
export const Makefundingrequesturl = base_url + "Artists/make_funding_request.php";

//Fetch label data
export const Fetchlabeldataurl = base_url + "Artists/fetch_label_data.php";

//Fetch statements
export const Fetchuserstatements = base_url + "Payments/fetch_payments_history.php";

//checkpaymentstatus
export const checkpaymentstatusurl = base_url + "Artists/check_funding_status.php";

//delete song
export const deletesongurl = base_url + "Artists/delete_song_api.php";

//cancel and delete membership url
export const cancelanddeleteurl = base_url + "Artists/cancel_and_delete_api.php";

//read notification
export const readnotificationurl = base_url + "Artists/read_notification.php";
//update splits
export const updatesplitsurl = base_url + "Artists/update_split.php";

//sync data
export const syncdataurl = base_url + "Artists/sync_appdata.php";

//update paypal email
export const updatepaypalemail = base_url + "Artists/connect_paypal.php";
//register push token url
export const pushtokenurl = base_url + "Artists/update_push_token.php";