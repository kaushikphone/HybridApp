let message = "Logged IN!",title = "ALERT", buttonName = "Alert Button", consoleMsg="Alert is Dismissed!", logOut="Successfully LogOut";
function alertCallback() {console.log(consoleMsg)}
function fblogin(){
    //debugger
 facebookConnectPlugin.login(['email'],function(response){
     //navigator.notification.alert(message,alertCallback);
     console.log("Message"+message);
     //navigator.notification.alert(JSON.stringify(response.authResponse),alertCallback);
     console.log("AUTHRESPONSE:"+response.authResponse);
     if(response.status=="connected"){
        UserDetails();
     }
 },function(error){
    navigator.notification.alert(error,alertCallback);
 })
}
function UserDetails(){
    facebookConnectPlugin.getLoginStatus((response)=>{
        if(response.status=="connected"){
            facebookConnectPlugin.api('/'+response.authResponse.userID+'?fields=id,name,gender,picture',[],
            function onSuccess(result){
                //navigator.notification.alert(result.name,alertCallback);
                console.log("RESULT"+JSON.stringify(result));
                $(document).find("#clientImg").attr({
                    'src':result.picture.data.url,
                    'width':result.picture.data.width,
                    'height':result.picture.data.height
                });
                $(document).find("#LoginElem").removeClass('hide');
                $(document).find("#clientName").text(result.name);
                $(document).find("#fbLoginElem").attr('disabled','disabled');
                $(document).find("#login-modal").modal('hide');
                //navigator.notification.alert(JSON.stringify(result),alertCallback); 
            },
            function onError(error){
                navigator.notification.alert(error,alertCallback);
            }
        );
        }
        else{
            navigator.notification.alert("Not logged in",alertCallback);
        }
    })
}
function fbLogOut(){
    facebookConnectPlugin.logout((response)=>{
        //debugger
        navigator.notification.alert(JSON.stringify(response.status));
    })
}