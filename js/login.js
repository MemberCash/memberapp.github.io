function trylogin(loginkey){
    try{
        login(loginkey);
    }catch(error){
        document.getElementById('loginerror').innerHTML=error.message;
        return;
    }
    displayContentBasedOnURLParameters();
}

function login(loginkey){

    //check valid private or public key
    var publicaddress="";
    if(loginkey.startsWith("L")||loginkey.startsWith("K")){
        var privaddress=new bch.PrivateKey(loginkey);
        publicaddress = privaddress.toAddress();

        privkey=loginkey;
        document.getElementById('loginkey').value="";
        if(typeof Storage !== void(0)){
            localStorage.setItem("privkey",privkey);
        }
    }else if(loginkey.startsWith("5")){
        /*
        var privaddress=new bch.PrivateKey(loginkey);
        publicaddress = privaddress.toAddress();

        privkey=loginkey;
        document.getElementById('loginkey').value="";
        if(typeof Storage !== void(0)){
            localStorage.setItem("privkey",privkey);
        }*/
        document.getElementById('loginkey').value="";
        alert("Uncompressed WIF not supported yet, please use a compressed WIF (starts with 'L' or 'K')");
        return;
    }else if(loginkey.startsWith("q")){
        const Address = bch.Address;
        publicaddress = new Address.fromString('bitcoincash:'+loginkey,'livenet','pubkeyhash',bch.Address.CashAddrFormat);
    }else if(loginkey.startsWith("b")){
        const Address = bch.Address;
        publicaddress = new Address.fromString(loginkey,'livenet','pubkeyhash',bch.Address.CashAddrFormat);
    }else if(loginkey.startsWith("1")||loginkey.startsWith("3")){
        const Address = bch.Address;
        publicaddress = new Address(loginkey);
    }

    pubkey=publicaddress.toString();
    qpubkey=publicaddress.toString(bch.Address.CashAddrFormat);
    
    if(typeof Storage !== void(0)){
        localStorage.setItem("pubkey",pubkey);
    }
    document.getElementById('loggedin').style.display="inline";
    document.getElementById('loggedout').style.display="none";
    getAndPopulateSettings();
    return;
    
}

function logout(){
    if(typeof Storage !== void(0)){
        localStorage.setItem("privkey",null);
        localStorage.setItem("pubkey",null);
    }
    privkey="";
    pubkey="";
    document.getElementById('loggedin').style.display="none";
    document.getElementById('loggedout').style.display="block";
    show('loginbox');
}