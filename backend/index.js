const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req, res) => {
	if ( req.query.name === undefined ) { console.error(new Error('Message does not have a sender!')); }
	if ( req.query.message === undefined ) { console.error(new Error('Message does not have a body!')); }
	
  const snapshot = await admin.database().ref('/messages').push({sender: req.query.name,messsage:req.query.message});
  res.redirect(303, snapshot.ref.toString());
});

exports.forceTimeStamp = functions.database.ref('/messages/{pushId}/message')
    .onCreate((snapshot, context) => {
		
		let final_string = snapshot.val()
		var maxLength = 25 
		if(final_string.length > maxLength){
			console.log("string "+final_string+ " is too long!")
			final_string = final_string.substr(0, maxLength)
			final_string = final_string.substr(0, Math.min(maxLength, final_string.lastIndexOf(" ")))
			console.log("trimmed to "+final_string)
		}
		
		if (snapshot.ref.parent.child('time') === undefined){
			snapshot.ref.parent.child('time').set(context.timestamp);          			 
		}
		
		var wordfilter = [{original:"magenta", replace:"*******"}]
		
		wordfilter.forEach(function(item, index){
			if (final_string.includes(item.original)){
				console.log("replaced "+item.original+" with "+item.replace)
				final_string = final_string.replace(item.original, item.replace);
				console.log(final_string)
			}
		});
		return snapshot.ref.parent.child('message').set(final_string);         
});
	