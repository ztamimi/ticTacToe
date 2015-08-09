// dBackend object
define(["firebase", "jquery", "jquerymobile"], function() {
	var dBackend = {};
        
	dBackend.init = function() {
            var temp = dBackend.url + (dBackend.appName + '/' + dBackend.sessionId  + '/');
            
            dBackend.ref = new Firebase(temp);
            dBackend.ref.once('value', function(snapshot) {
                if (snapshot.exists()) {
                    console.log("data exists");
                    dBackend.oldDeviceCallback();
                }
                else {
                    dBackend.newDeviceCallback();
                }
            });
            
            dBackend.dataRef = dBackend.ref.child("data");
            dBackend.listRef = dBackend.ref.child("playList");
            
            //dBackend.connected = false;
            dBackend.connectBtn = $("#connect");
            
            dBackend.disconnectBtn = $("#disconnectBtn");
            
            dBackend.monitorIdInput = $("#monitorId");
            dBackend.connectBtn.on("click", dBackend.clickConnect); 
            
            dBackend.disconnectBtn.on("click", dBackend.clickDisconnect);
            
            dBackend.monitorIdInput.keypress(function( event ) {
                if (event.which == 13) {
                    event.preventDefault();
                    dBackend.clickConnect();
                }
            });
        };
        
        dBackend.setNewDeviceCallback = function(callback) {
            dBackend.newDeviceCallback = callback;
        };

        dBackend.setOldDeviceCallback = function(callback) {
            dBackend.oldDeviceCallback = callback;
        };
        //// connect //////////
        dBackend.clickConnect = function() {
            var monitorId = dBackend.monitorIdInput.val();
            if (!monitorId)
                return;
            var temp = dBackend.url + dBackend.appName + '/' + monitorId + '/';
            dBackend.monitorRef = new Firebase(temp);
            $.mobile.loading('show');
            dBackend.monitorRef.once('value', function(snapshot) {
                
                if (snapshot.exists()) {
                    if (snapshot.child('status').val() === 0) {
                        dBackend.monitorRef.update({"connectTo": dBackend.sessionId});
                        dBackend.monitorRef.update({"status": 1});
                        dBackend.monitorRef.on('child_changed', dBackend.onStatusChange);
                    }
                    else 
                        dBackend.connectError(1);
                }
                else 
                    dBackend.connectError(2);
            });
        };
        
        dBackend.onStatusChange = function(snapshot) {
			$.mobile.loading('hide');

            var value = snapshot.val();
            var key = snapshot.key();
            if (key === 'status' && value === 2) {
                dBackend.flip(2);
                dBackend.connectCallback();
                dBackend.monitorRef.onDisconnect().update({"connectTo": 0});
                dBackend.monitorRef.onDisconnect().update({"status": 0});
                dBackend.connectError(0);
                return;
            }
            if (key === 'status' && value === 0) {
                dBackend.monitorRef = null;
                dBackend.flip(1);
                dBackend.connectError(3);
                dBackend.disconnectCallback();
            }
        };
        
        dBackend.connectError = function(code) {
            $.mobile.loading('hide');
            var message;
            switch (code) {
                case 0:
                    message = "successfully connected to monitor";
                    break;
                case 1:
                    message = "not available to connect";
                    break;
                case 2:
                    message = "invalid monitor id";
                    break;
                case 3:
                    message = "disconnect from monitor";
                    break; 
            };
            
            $("#connectStatus").text(message);
            $("#connectStatus").popup("open", {"positionTo": "#connectForm"});
            setTimeout(function(){
                        $("#connectStatus").popup("close"); 
                        //$.mobile.changePage("#remotePage", {transition: "none", changeHash: false});
                    }, 2000);
        };
        
        dBackend.clickDisconnect = function() {
			$.mobile.loading('show');

            dBackend.connectError(3);
            dBackend.flip(1);
            dBackend.monitorRef.update({"connectTo": 0});
            dBackend.monitorRef.update({"status": 0});
            //dBackend.monitorRef = null;
            dBackend.disconnectCallback();
        };
        
        dBackend.flip = function(status) {
            if (status === 1) {
                dBackend.connectBtn.off("click", dBackend.clickDisconnect);
                dBackend.connectBtn.button("option", "icon", "check");
                dBackend.connectBtn.on("click", dBackend.clickConnect);
                $("#connectForm").collapsible("expand");
            }
            else if (status === 2) {
                dBackend.connectBtn.off("click", dBackend.clickConnect);
                dBackend.connectBtn.button("option", "icon", "delete");
                dBackend.connectBtn.on("click", dBackend.clickDisconnect);
                $("#connectForm").collapsible("collapse");

            }
            //$("#connectForm").collapsible("collapse");
        };
        
        dBackend.setConnectCallback = function(callback) {
            dBackend.connectCallback = callback;
        };
        
        dBackend.setDisconnectCallback = function(callback) {
            dBackend.disconnectCallback = callback;
        };
        
        dBackend.updateValue = function(obj) {
            dBackend.dataRef.update(obj);
	};
        
        dBackend.valueUpdated = function(snapshot) {
            var value = snapshot.val();
            var key = snapshot.key();
        
            dBackend.updateValueCallback(key, value);
	};
        
        dBackend.addItem = function(key, value) {
            var obj = {};
            obj[key] = value;
            dBackend.listRef.update(obj);
        };
        
        dBackend.itemAdded = function(snapshot) {
            var value = snapshot.val();
            var key = snapshot.key();
            var task = 'add';
            
            //console.log("dBackend.receiveListAdd " + task + ":" + key);
            dBackend.updateListCallback(task, key, value);
        };
        
        dBackend.deleteItem = function(key) {
            dBackend.listRef.child(key).remove();
        };
        
        dBackend.itemDeleted = function(snapshot) {
            var value = snapshot.val();
            var key = snapshot.key();
            var task = 'delete';
            
            dBackend.updateListCallback(task, key, value);
        };
        
        ////////// set methods ///////////////
        dBackend.setUrl = function(url) {
            dBackend.url = url;
        };
        
        dBackend.setAppName = function(name) {
            dBackend.appName = name;
        };
        
        dBackend.setSessionId = function(sessionId) {
            dBackend.sessionId = sessionId;
        };
        
        dBackend.setUpdateValueCallback = function(callback) {
            dBackend.updateValueCallback = callback;
            dBackend.dataRef.on('child_added', dBackend.valueUpdated); 
            dBackend.dataRef.on('child_changed', dBackend.valueUpdated);
        };
        
        dBackend.setUpdateListCallback = function(callback) {
            dBackend.updateListCallback = callback;
            dBackend.listRef.on('child_added', dBackend.itemAdded);
            dBackend.listRef.on('child_removed', dBackend.itemDeleted);
        };
        
    return dBackend;
});
